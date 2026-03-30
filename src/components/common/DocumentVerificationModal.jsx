import { useState, useEffect } from 'react';
import { FileText, CheckCircle, XCircle, Clock, Eye, Download, AlertCircle, Pause, UserCheck } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import { MediaViewer } from './MediaViewer';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { usePermission } from '../../hooks/usePermission';
import { formatDateISTNoTime } from '../../utils/date';

const DocumentVerificationModal = ({ isOpen, onClose, applicationId, onVerificationComplete }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [verifying, setVerifying] = useState(false);
  const [application, setApplication] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionRemarks, setActionRemarks] = useState('');
  const [showActionConfirm, setShowActionConfirm] = useState(null);
  
  const { hasPermission } = usePermission();

  useEffect(() => {
    if (isOpen && applicationId) {
      fetchDocuments();
    }
  }, [isOpen, applicationId]);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const [docsResponse, appResponse] = await Promise.all([
        api.get(`/admin/review/applications/${applicationId}/documents`),
        api.get(`/admin/review/applications/${applicationId}`)
      ]);
      
      if (docsResponse.data.success) {
        setDocuments(docsResponse.data.data.documents);
      }
      
      if (appResponse.data.success) {
        setApplication(appResponse.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDoc = (doc) => {
    setSelectedDocs(prev => {
      const exists = prev.find(d => d.type === doc.type && d.referenceId === doc.referenceId);
      if (exists) {
        return prev.filter(d => !(d.type === doc.type && d.referenceId === doc.referenceId));
      }
      return [...prev, { type: doc.type, referenceId: doc.referenceId, path: doc.path }];
    });
  };

  const handleSelectAll = () => {
    if (selectedDocs.length === documents.length) {
      setSelectedDocs([]);
    } else {
      setSelectedDocs(documents.map(d => ({ type: d.type, referenceId: d.referenceId, path: d.path })));
    }
  };

  const handleVerifySelected = async (status) => {
    if (selectedDocs.length === 0) {
      toast.error('Please select at least one document');
      return;
    }

    setVerifying(true);
    try {
      const documentsToVerify = selectedDocs.map(doc => ({
        type: doc.type,
        referenceId: doc.referenceId,
        path: doc.path,
        status: status,
        remarks: null
      }));

      const response = await api.post(`/admin/review/applications/${applicationId}/verify-documents`, {
        documents: documentsToVerify
      });

      if (response.data.success) {
        toast.success(`${response.data.data.verifiedCount} document(s) ${status === 'VERIFIED' ? 'verified' : 'rejected'}`);
        await fetchDocuments();
        setSelectedDocs([]);
        if (onVerificationComplete) {
          onVerificationComplete(response.data.data);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to verify documents');
    } finally {
      setVerifying(false);
    }
  };

  const handleVerifyAll = async (status) => {
    setVerifying(true);
    try {
      const response = await api.post(`/admin/review/applications/${applicationId}/verify-all-documents`, {
        status: status
      });

      if (response.data.success) {
        toast.success(`All documents ${status === 'VERIFIED' ? 'verified' : 'rejected'}`);
        await fetchDocuments();
        setSelectedDocs([]);
        if (onVerificationComplete) {
          onVerificationComplete(response.data.data);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to verify all documents');
    } finally {
      setVerifying(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'VERIFIED':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'REJECTED':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      VERIFIED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800',
      PENDING: 'bg-yellow-100 text-yellow-800'
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
        {status}
      </span>
    );
  };

  const handleApplicationAction = async (action) => {
    setActionLoading(true);
    try {
      let endpoint;
      let payload;

      if (application?.status === 'PROVISIONAL_SELECTED') {
        endpoint = `/admin/review/applications/${applicationId}/final-selection`;
        // Map UI actions to API expected values for final selection
        const apiAction = action === 'FINAL_SELECT' ? 'SELECT' : 'REJECT';
        payload = { action: apiAction, remarks: actionRemarks || null };
      } else {
        endpoint = `/admin/review/applications/${applicationId}/provisional-action`;
        payload = { action, remarks: actionRemarks || null };
      }
      
      const response = await api.post(endpoint, payload);

      if (response.data.success) {
        toast.success(`Application action completed successfully`);
        setShowActionConfirm(null);
        setActionRemarks('');
        if (onVerificationComplete) {
          onVerificationComplete(response.data.data);
        }
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to process action');
    } finally {
      setActionLoading(false);
    }
  };

  const summary = {
    total: documents.length,
    verified: documents.filter(d => d.verificationStatus === 'VERIFIED').length,
    pending: documents.filter(d => d.verificationStatus === 'PENDING').length,
    rejected: documents.filter(d => d.verificationStatus === 'REJECTED').length
  };

  const allDocumentsVerified = summary.total > 0 && summary.verified === summary.total;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Document Verification" size="customVerificationModal">
      <div className="flex flex-col h-[70vh]">
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-1 space-y-4 md:space-y-6 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl">
            <div className="text-center border-r border-slate-200 last:border-0">
              <div className="text-2xl font-bold text-slate-900">{summary.total}</div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mt-1">Total</div>
            </div>
            <div className="text-center border-r border-slate-200 last:border-0">
              <div className="text-2xl font-bold text-green-600">{summary.verified}</div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mt-1">Verified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">{summary.pending}</div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mt-1">Pending</div>
            </div>
          </div>

          {/* Documents List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-3 text-slate-500 text-sm">Loading documents...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {documents.map((doc, index) => {
                const isSelected = selectedDocs.find(d => d.type === doc.type && d.referenceId === doc.referenceId);
                return (
                  <div
                    key={`${doc.type}-${doc.referenceId || 'main'}-${index}`}
                    className={`flex flex-col p-4 border rounded-xl transition-all duration-200 ${
                      isSelected ? 'border-blue-500 bg-blue-50/30 shadow-sm' : 'border-slate-200 hover:border-blue-300 hover:shadow-sm bg-white'
                    }`}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSelectDoc(doc)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectDoc(doc);
                      }
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="pt-1">
                          <input
                            type="checkbox"
                            checked={!!isSelected}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleSelectDoc(doc);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                          />
                        </div>
                        <div className="pt-1">
                          {getStatusIcon(doc.verificationStatus)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-slate-900 text-base leading-tight">{doc.label}</div>
                          {doc.verifiedBy && (
                            <div className="text-xs text-slate-500 mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                              <span className="flex items-center gap-1">
                                <UserCheck className="w-3 h-3" />
                                Verified by <span className="font-medium text-slate-700">{doc.verifiedBy}</span>
                              </span>
                              <span className="text-slate-300">|</span>
                              <span>on {formatDateISTNoTime(doc.verifiedAt)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 self-end sm:self-center">
                        {getStatusBadge(doc.verificationStatus)}
                        {doc.path && (
                          <MediaViewer
                            src={doc.path}
                            fileName={doc.doc_type_name || 'Document'}
                            variant="button"
                            className="text-blue-600 hover:bg-blue-50 rounded-lg px-3 py-1.5 border border-transparent hover:border-blue-100 transition-all flex items-center gap-1.5 text-sm font-medium"
                            onClick={(e) => e.stopPropagation()}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Fixed Footer Area for Actions */}
        <div className="mt-auto pt-4 border-t border-slate-100 bg-white">
          {/* Bulk Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-blue-50/50 border border-blue-100 rounded-xl gap-4 mb-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <input
                type="checkbox"
                checked={selectedDocs.length === documents.length && documents.length > 0}
                onChange={handleSelectAll}
                className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 transition-all cursor-pointer"
              />
              <span className="text-sm font-medium text-slate-700">
                {selectedDocs.length > 0 ? `${selectedDocs.length} selected` : 'Select All'}
              </span>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                onClick={() => handleVerifySelected('VERIFIED')}
                disabled={selectedDocs.length === 0 || verifying}
                variant="primary"
                className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 focus:ring-green-500"
                size="sm"
              >
                <CheckCircle className="w-4 h-4 mr-1.5" />
                Verify Selected
              </Button>
              <Button
                onClick={() => handleVerifyAll('VERIFIED')}
                disabled={verifying}
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none"
              >
                Verify All
              </Button>
            </div>
          </div>

          {application && (
            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
                Application Actions
                <span className="text-xs font-normal text-slate-500 px-2 py-0.5 bg-slate-100 rounded-full">
                  {application.status}
                </span>
              </h4>
              
              {!allDocumentsVerified && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-amber-800 leading-relaxed">
                    <span className="font-semibold">Action Required:</span> Provisional selection requires all documents to be verified.
                  </div>
                </div>
              )}

              {showActionConfirm ? (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between">
                    <h5 className="font-semibold text-slate-900 flex items-center gap-2">
                      {showActionConfirm === 'PROVISIONAL_SELECT' || showActionConfirm === 'FINAL_SELECT' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : showActionConfirm === 'HOLD' ? (
                        <Pause className="w-5 h-5 text-amber-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      Confirm {showActionConfirm === 'PROVISIONAL_SELECT' ? 'Provisional Selection' : 
                               showActionConfirm === 'FINAL_SELECT' ? 'Final Selection' :
                               showActionConfirm === 'HOLD' ? 'Hold' : 'Rejection'}
                    </h5>
                    <button
                      onClick={() => setShowActionConfirm(null)}
                      className="text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-100 rounded-full p-1 transition-all"
                    >
                      <XCircle className="w-6 h-6" />
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Remarks (Optional)
                    </label>
                    <textarea
                      value={actionRemarks}
                      onChange={(e) => setActionRemarks(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm shadow-sm placeholder:text-slate-400"
                      placeholder="Enter any remarks..."
                    />
                  </div>
                  <div className="flex gap-3 justify-end">
                    <Button
                      onClick={() => setShowActionConfirm(null)}
                      variant="ghost"
                      size="sm"
                      disabled={actionLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => handleApplicationAction(showActionConfirm)}
                      variant={showActionConfirm === 'REJECT' ? 'danger' : 'primary'}
                      className={showActionConfirm === 'PROVISIONAL_SELECT' || showActionConfirm === 'FINAL_SELECT' ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' : showActionConfirm === 'HOLD' ? 'bg-amber-500 hover:bg-amber-600 focus:ring-amber-500' : ''}
                      size="sm"
                      disabled={actionLoading}
                    >
                      {actionLoading ? 'Processing...' : 'Confirm Action'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {(application.status === 'ELIGIBLE' || application.status === 'ON_HOLD' || application.status === 'SUBMITTED') && (
                    <>
                      {hasPermission('applications.approve') && (
                        <Button
                          onClick={() => setShowActionConfirm('PROVISIONAL_SELECT')}
                          variant="primary"
                          className="bg-green-600 hover:bg-green-700 focus:ring-green-500 shadow-sm"
                          size="sm"
                          disabled={!allDocumentsVerified && !application.document_verified}
                          leftIcon={<CheckCircle className="w-4 h-4" />}
                        >
                          Provisional Select
                        </Button>
                      )}
                      {hasPermission('applications.edit-status') && (
                        <Button
                          onClick={() => setShowActionConfirm('HOLD')}
                          variant="primary"
                          className="bg-amber-500 hover:bg-amber-600 focus:ring-amber-500 shadow-sm"
                          size="sm"
                          leftIcon={<Pause className="w-4 h-4" />}
                        >
                          Hold
                        </Button>
                      )}
                    </>
                  )}

                  {application.status === 'PROVISIONAL_SELECTED' && hasPermission('applications.approve') && (
                    <Button
                      onClick={() => setShowActionConfirm('FINAL_SELECT')}
                      variant="primary"
                      className="bg-green-600 hover:bg-green-700 focus:ring-green-500 shadow-sm"
                      size="sm"
                      leftIcon={<UserCheck className="w-4 h-4" />}
                    >
                      Final Select
                    </Button>
                  )}

                  {hasPermission('applications.reject') && (
                    <Button
                      onClick={() => setShowActionConfirm('REJECT')}
                      variant="danger"
                      size="sm"
                      className="shadow-sm ml-auto"
                      leftIcon={<XCircle className="w-4 h-4" />}
                    >
                      Reject
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DocumentVerificationModal;

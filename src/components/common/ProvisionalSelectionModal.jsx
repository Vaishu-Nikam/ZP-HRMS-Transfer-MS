import { useState } from 'react';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import toast from 'react-hot-toast';
import api from '../../services/api';

// may be unused component, but keeping it for now

const ProvisionalSelectionModal = ({ isOpen, onClose, application, onActionComplete }) => {
  const [action, setAction] = useState('');
  const [remarks, setRemarks] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !application) return null;

  const handleSubmit = async () => {
    if (!action) {
      toast.error('Please select an action');
      return;
    }

    setLoading(true);
    try {
      const endpoint = application?.status === 'PROVISIONAL_SELECTED' 
        ? `/admin/review/applications/${application.application_id}/final-selection`
        : `/admin/review/applications/${application.application_id}/provisional-action`;

      const payload = application?.status === 'PROVISIONAL_SELECTED'
        ? { action: action === 'SELECT' ? 'SELECT' : 'REJECT', remarks }
        : { action, remarks };

      const response = await api.post(endpoint, payload);

      if (response.data.success) {
        toast.success(`Application ${action.toLowerCase().replace('_', ' ')} successfully`);
        if (onActionComplete) {
          onActionComplete(response.data.data);
        }
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to process action');
    } finally {
      setLoading(false);
    }
  };

  const getActionButtons = () => {
    if (!application) return [];
    
    if (application.status === 'PROVISIONAL_SELECTED') {
      return [
        { value: 'SELECT', label: 'Final Select', icon: CheckCircle, color: 'success' },
        { value: 'REJECT', label: 'Reject', icon: XCircle, color: 'danger' }
      ];
    } else {
      return [
        { value: 'PROVISIONAL_SELECT', label: 'Provisional Select', icon: CheckCircle, color: 'success', requiresVerification: true },
        { value: 'HOLD', label: 'Hold', icon: Clock, color: 'warning' },
        { value: 'REJECT', label: 'Reject', icon: XCircle, color: 'danger' }
      ];
    }
  };

  const actionButtons = getActionButtons();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Application Action" size="md">
      <div className="space-y-4">
        {/* Application Info */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">Application ID</div>
          <div className="font-medium">{application.application_number}</div>
          <div className="text-sm text-gray-600 mt-2">Current Status</div>
          <div className="font-medium">{application.status}</div>
          {!application.document_verified && (
            <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                Documents not verified. Provisional selection requires all documents to be verified.
              </div>
            </div>
          )}
        </div>

        {/* Action Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Action
          </label>
          <div className="grid grid-cols-1 gap-2">
            {actionButtons.map((btn) => {
              const Icon = btn.icon;
              const isDisabled = btn.requiresVerification && !application.document_verified;
              return (
                <button
                  key={btn.value}
                  onClick={() => !isDisabled && setAction(btn.value)}
                  disabled={isDisabled}
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg transition-all ${
                    action === btn.value
                      ? 'border-blue-500 bg-blue-50'
                      : isDisabled
                      ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${
                    btn.color === 'success' ? 'text-green-600' :
                    btn.color === 'warning' ? 'text-yellow-600' :
                    btn.color === 'danger' ? 'text-red-600' : 'text-gray-600'
                  }`} />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{btn.label}</div>
                    {isDisabled && (
                      <div className="text-xs text-red-600">Requires document verification</div>
                    )}
                  </div>
                  {action === btn.value && (
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Remarks */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Remarks (Optional)
          </label>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter any remarks or notes..."
          />
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button onClick={onClose} variant="secondary" disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="primary"
            disabled={!action || loading}
          >
            {loading ? 'Processing...' : 'Submit'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProvisionalSelectionModal;

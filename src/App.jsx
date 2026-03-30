// import { useEffect } from "react";
// import { Toaster } from "react-hot-toast";
// import { AppRouter } from "./router";
// import { useAppDispatch } from "./redux/store";
// import { restoreUser } from "./redux/slices/authSlice";
// import { getUser, isAuthenticated } from "./utils/auth.utils";

// function App() {
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     const user = getUser();
//     if (user && isAuthenticated()) {
//       dispatch(restoreUser(user));
//     }
//   }, [dispatch]);

//   return (
//     <div className="h-full">
//       <Toaster position="top-center" />
//       <AppRouter />
//     </div>
//   );
// }

// export default App;



import { Toaster } from "react-hot-toast";
import { AppRouter } from "./router";

function App() {
  return (
    <div className="h-full">
      <Toaster position="top-center" />
      <AppRouter />
    </div>
  );
}

export default App;
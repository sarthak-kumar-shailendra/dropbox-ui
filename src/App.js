import Upload from './pages/Upload.tsx';
import Files from './pages/Files.tsx';
import Error from './pages/Error.tsx';
import {  createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";


const appRouter = createBrowserRouter([
  {
    path: "/", // show path for routing
    element: <AppLayout />, // show component for particular path
    errorElement: <Error />, // show error component for path is different
    children: [
      // show children component for routing
      {
        path: "/",
        element: <Upload />,
      },
      {
        path: "/files",
        element: <Files />,
      },
      // {
      //   path: "/files/:fileId",
      //   element: <FileElement />,
      // },
    ],
    }
]);

function App() {
  return (
    <RouterProvider router={appRouter} >

    </RouterProvider>
  );
}

function AppLayout() {
  return (
      <div>
        <h1 className='text-5xl text-white m-5 text-center'>DROPBOX</h1>
        <Outlet/>
      </div>
  );
}


export default App;

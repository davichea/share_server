
import Header from "./Header";
import Sidebar from "./SideBar";

function LayoutNpl({ children }) {
  return (
    <div className="min-h-screen flex bg-slate-50 overflow-y-hidden">
      <Sidebar/>

      <main className="max-h-screen flex-1 min-w-0 bg-slate-50">
        <div className="min-h-screen flex flex-col">
          <Header/>
          <div className="flex-1  px-8 py-5 max-h-[93vh] overflow-y-auto">
            {children}
          </div>
        </div>

      </main>

    </div>


  )
}
export default LayoutNpl;
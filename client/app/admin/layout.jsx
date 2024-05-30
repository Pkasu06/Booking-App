import AdminMenu from "../_components/Admin/AdminMenu";

export default async function Layout({ children }) {
  return (
    <div className="drawer bg-white">
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content flex flex-col m-4 p-4">
        <div>{children}</div>
      </div>

      <AdminMenu></AdminMenu>
    </div>
  );
}

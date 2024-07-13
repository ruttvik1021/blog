import { PlusCircle } from "lucide-react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";

const Blogs = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  return (
    <>
      <div className="flex justify-end">
        {pathname === "/blogs/create" || id ? (
          <Button size="sm" className="h-8 gap-1">
            <span onClick={() => navigate("/blogs")}>Back</span>
          </Button>
        ) : (
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span onClick={() => navigate("/blogs/create")}>Add Product</span>
          </Button>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Blogs;

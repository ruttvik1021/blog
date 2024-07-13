import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="p-8 max-w-md mx-auto text-center shadow-inner drop-shadow-2xl">
        <CardTitle>
          <Label className="text-4xl font-bold mb-4">404</Label>
        </CardTitle>
        <CardHeader>
          <Label className="text-xl font-semibold mb-4">
            Oops! Page Not Found
          </Label>
        </CardHeader>
        <CardContent>
          <Label className="mb-6">
            The page you're looking for doesn't exist or has been moved.
          </Label>
        </CardContent>
        <Button variant="default" onClick={() => navigate("/")}>
          Go Back to Home
        </Button>
      </Card>
    </div>
  );
};

export default NotFoundPage;

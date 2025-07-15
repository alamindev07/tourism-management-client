import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <div className="text-center mt-20 text-red-500">
      <h1 className="text-3xl font-bold">403 - Unauthorized Access</h1>
      <p>You do not have permission to view this page.</p>


<Link to="/"><button  className="btn-sm text-black btn-outline bg-green-600 rounded-lg p-2" >Back to Home</button></Link>
    </div>
  );
};

export default Unauthorized;

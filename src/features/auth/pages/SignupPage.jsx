import SignupForm from "../components/SignupForm";

function SignupPage() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <h1 className="mb-4 text-center">Sign Up</h1>

          <SignupForm />
        </div>
      </div>
    </div>
  );
}

export default SignupPage;

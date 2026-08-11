import { useEffect, useState } from "react";
import { useAuth } from "../../auth/context/useAuth";
import { getApiErrorMessage } from "../../../services/apiError";
import authApi from "../../auth/services/authApi";

function ProfilePage() {
  const { user, updateUser, accessToken } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    function setData(data) {
      setFormData({ ...data });
    }
    if (user) {
      setData(user);
    }
  }, [user]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setServerError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const updatedUser = await authApi.updateProfile(
        user.id,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
        accessToken
      );

      updateUser(updatedUser);

      setSuccessMessage("Profile updated successfully.");
    } catch (error) {
      setServerError(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="h3 mb-4">My Profile</h1>

              {serverError && (
                <div className="alert alert-danger" role="alert">
                  {serverError}
                </div>
              )}

              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    value={formData.email}
                    disabled
                  />

                  <div className="form-text">Email cannot be changed.</div>
                </div>

                <div className="mb-4">
                  <label className="form-label">User ID</label>

                  <input
                    type="text"
                    className="form-control"
                    value={user.id}
                    disabled
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

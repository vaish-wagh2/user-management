import { useEffect, useState } from "react";
import { userFormConfig } from "../config/userFormConfig";
import { User } from "../types/User";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (user: User) => void;
  initialData?: User | null;
}

type Errors = Partial<Record<keyof User, string>>;

const emptyForm: User = { firstName: "", lastName: "", phone: "", email: "" };

const InputField = ({
  label,
  name,
  type,
  value,
  onChange,
  error
}: {
  label: string;
  name: keyof User;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) => (
  <div className="mb-3">
    <label className="form-label fw-semibold text-muted">{label}</label>
    <div className="input-group">
      <span className="input-group-text bg-white"><i className={`bi ${getIcon(name)}`}></i></span>
      <input type={type} name={name} value={value} onChange={onChange} className={`form-control ${error ? "is-invalid" : ""}`} placeholder={`Enter ${label.toLowerCase()}`} />
    </div>
    {error && <div className="text-danger small mt-1">{error}</div>}
  </div>
);

export default function UserForm({ open, onClose, onSubmit, initialData }: Props) {
  const [formData, setFormData] = useState<User>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => { if (open) { setFormData(initialData ?? emptyForm); setErrors({}); } }, [open, initialData]);
  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    setErrors(p => ({ ...p, [name]: "" }));
  };

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.firstName?.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName?.trim()) newErrors.lastName = "Last name is required";
    if (!formData.phone?.toString().trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(formData.phone.toString())) newErrors.phone = "Enter valid 10-digit phone number";
    if (!formData.email?.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Enter valid email address";

    setErrors(newErrors);
    const firstInvalid = Object.keys(newErrors)[0];
    firstInvalid && document.querySelector<HTMLInputElement>(`input[name="${firstInvalid}"]`)?.focus();
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!validate()) return; onSubmit(formData); onClose(); };

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal d-block" tabIndex={-1} style={{ zIndex: 1055 }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 rounded-4 shadow">
            <div className="modal-header bg-primary text-white rounded-top-4">
              <h5 className="modal-title fw-semibold"><i className="bi bi-person me-2"></i>{initialData ? "Update User" : "Create User"}</h5>
              <button className="btn-close btn-close-white" onClick={onClose} />
            </div>
            <form onSubmit={handleSubmit} noValidate>
              <div className="modal-body px-4 py-3">
                {userFormConfig.map(f => (
                  <InputField key={f.name} label={f.label} name={f.name as keyof User} type={f.type} value={`${formData[f.name as keyof User] ?? ""}`} onChange={handleChange} error={errors[f.name as keyof User]} />
                ))}
              </div>
              <div className="modal-footer px-4 pb-4">
                <button type="button" className="btn btn-outline-secondary px-4" onClick={onClose}><i className="bi bi-x-circle me-1"></i>Cancel</button>
                <button type="submit" className="btn btn-primary px-4"><i className={`bi ${initialData ? "bi-pencil" : "bi-plus-circle"} me-1`}></i>{initialData ? "Update" : "Create"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

function getIcon(name: keyof User | string) {
  switch (name) { case "firstName": case "lastName": return "bi-person"; case "phone": return "bi-telephone"; case "email": return "bi-envelope"; default: return "bi-input-cursor"; }
}

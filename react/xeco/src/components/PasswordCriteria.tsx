import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface PasswordCriteriaProps {
  minLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

const PasswordCriteria: React.FC<PasswordCriteriaProps> = ({
  minLength,
  hasUpperCase,
  hasLowerCase,
  hasNumber,
  hasSpecialChar,
}) => {
  return (
    <div style={{
      marginTop: "0.5rem",
      backgroundColor: "#1e1e1e",
      borderRadius: "8px",
      padding: "0.75rem",
    }}>
      <p style={{ margin: "0 0 0.5rem", fontSize: "0.9rem", fontWeight: 600, color: "#ccc" }}>
        Password Requirements:
      </p>

      <ul style={{ listStyle: "none", paddingLeft: "1rem", margin: 0 }}>
        <CriteriaItem
          label="Minimum 8 characters"
          isMet={minLength}
        />
        <CriteriaItem
          label="At least one uppercase letter"
          isMet={hasUpperCase}
        />
        <CriteriaItem
          label="At least one lowercase letter"
          isMet={hasLowerCase}
        />
        <CriteriaItem
          label="At least one number"
          isMet={hasNumber}
        />
        <CriteriaItem
          label="At least one special character (e.g., !@#$%)"
          isMet={hasSpecialChar}
        />
      </ul>
    </div>
  );
};

interface CriteriaItemProps {
  label: string;
  isMet: boolean;
}

const CriteriaItem: React.FC<CriteriaItemProps> = ({ label, isMet }) => {
  const iconStyle = { marginRight: "0.5rem", fontSize: "1rem" };

  return (
    <li style={{ display: "flex", alignItems: "center", marginBottom: "0.4rem", color: "#ccc" }}>
      {isMet ? (
        <FaCheckCircle style={{ ...iconStyle, color: "#00c087" }} />
      ) : (
        <FaTimesCircle style={{ ...iconStyle, color: "#666" }} />
      )}
      <span style={{ fontSize: "0.9rem" }}>{label}</span>
    </li>
  );
};

export default PasswordCriteria;

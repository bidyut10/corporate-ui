import React from "react";
import PropTypes from "prop-types";
import { Upload, X } from "lucide-react";

const CForm = ({
    fields,
    onSubmit,
    submitText = "Submit",
    className,
    theme = "light",
}) => {
    const [formData, setFormData] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [filePreview, setFilePreview] = React.useState({});

    const themes = {
        light: {
            bg: "bg-white",
            text: "text-gray-800",
            border: "border-gray-200",
            input: "bg-white",
            button: "bg-black hover:bg-gray-950 text-white",
            error: "text-red-500",
            placeholder: "placeholder-gray-400",
            file: "bg-gray-50 hover:bg-gray-100",
        },
        dark: {
            bg: "bg-gray-800",
            text: "text-white",
            border: "border-gray-600",
            input: "bg-gray-700",
            button: "bg-purple-600 hover:bg-purple-700 text-white",
            error: "text-purple-400",
            placeholder: "placeholder-gray-100",
            file: "bg-gray-700 hover:bg-gray-600",
        },
    };

    const currentTheme = themes[theme];

    const validateField = (name, value, validations = {}) => {
        const fieldErrors = [];

        if (validations.required && !value) {
            fieldErrors.push("This field is required");
        }

        if (validations.email && !/\S+@\S+\.\S+/.test(value)) {
            fieldErrors.push("Invalid email address");
        }

        if (validations.minLength && value?.length < validations.minLength) {
            fieldErrors.push(`Minimum ${validations.minLength} characters required`);
        }

        if (validations.maxLength && value?.length > validations.maxLength) {
            fieldErrors.push(`Maximum ${validations.maxLength} characters allowed`);
        }

        if (validations.fileType && value) {
            const allowedTypes = validations.fileType;
            const fileType = value.type || value.name.split(".").pop();
            if (!allowedTypes.includes(fileType)) {
                fieldErrors.push(`Allowed file types: ${allowedTypes.join(", ")}`);
            }
        }

        if (validations.maxFileSize && value?.size > validations.maxFileSize) {
            fieldErrors.push(
                `File size must be less than ${validations.maxFileSize / (1024 * 1024)
                }MB`
            );
        }

        return fieldErrors;
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            const file = files[0];
            if (file) {
                setFormData((prev) => ({ ...prev, [name]: file }));

                // Handle image preview
                if (file.type.startsWith("image/")) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setFilePreview((prev) => ({ ...prev, [name]: reader.result }));
                    };
                    reader.readAsDataURL(file);
                }

                // Handle file validation
                const field = fields.find((f) => f.name === name);
                if (field?.validations) {
                    const fieldErrors = validateField(name, file, field.validations);
                    setErrors((prev) => ({ ...prev, [name]: fieldErrors }));
                }
            }
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
            const field = fields.find((f) => f.name === name);
            if (field?.validations) {
                const fieldErrors = validateField(name, value, field.validations);
                setErrors((prev) => ({ ...prev, [name]: fieldErrors }));
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        let hasErrors = false;

        fields.forEach((field) => {
            const fieldErrors = validateField(
                field.name,
                formData[field.name],
                field.validations
            );
            if (fieldErrors.length > 0) {
                newErrors[field.name] = fieldErrors;
                hasErrors = true;
            }
        });

        setErrors(newErrors);
        if (!hasErrors) {
            onSubmit(formData);
        }
    };

    const renderInput = (field) => {
        switch (field.type) {
            case "file":
                return (
                    <div className="relative">
                        <input
                            type="file"
                            id={field.name}
                            name={field.name}
                            onChange={handleChange}
                            className="hidden"
                            accept={field.accept}
                            {...field.props}
                        />
                        <label
                            htmlFor={field.name}
                            className={`flex items-center justify-center w-full px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer ${currentTheme.file} ${currentTheme.border}`}
                        >
                            <div className="flex flex-col items-center">
                                <div className="flex justify-center items-center gap-2">
                                    <Upload className="w-4 h-4" />
                                    <span className={currentTheme.text}>
                                        {field.placeholder || "Choose file"}
                                    </span>
                                </div>
                                {formData[field.name] && (
                                    <span className="text-xs mt-2 text-gray-700">
                                        {formData[field.name].name}
                                    </span>
                                )}
                            </div>
                        </label>
                        {filePreview[field.name] &&
                            field.type === "file" &&
                            formData[field.name]?.type?.startsWith("image/") && (
                                <div className="mt-2 relative">
                                    <img
                                        src={filePreview[field.name]}
                                        alt="Preview"
                                        className="w-full h-32 object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData((prev) => ({ ...prev, [field.name]: null }));
                                            setFilePreview((prev) => ({
                                                ...prev,
                                                [field.name]: null,
                                            }));
                                        }}
                                        className="absolute top-2 right-2 p-1 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                    </div>
                );
            case "textarea":
                return (
                    <textarea
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className={`w-full px-4 py-2 border rounded-lg ${currentTheme.input} ${currentTheme.border} ${currentTheme.text} ${currentTheme.placeholder}`}
                        rows={field.rows || 3}
                        {...field.props}
                    />
                );
            default:
                return (
                    <input
                        type={field.type || "text"}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className={`w-full px-4 py-2 border rounded-lg ${currentTheme.input} ${currentTheme.border} ${currentTheme.text} ${currentTheme.placeholder}`}
                        {...field.props}
                    />
                );
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`${className} ${currentTheme.bg} p-6 rounded-xl max-w-md w-full mx-auto space-y-6`}
            noValidate
        >
            {fields.map((field) => (
                <div key={field.name} className="space-y-2">
                    {field.label && (
                        <label
                            htmlFor={field.name}
                            className={`block text-sm font-medium ${currentTheme.text}`}
                        >
                            {field.label}
                            {field.validations?.required && (
                                <span className={currentTheme.error}>*</span>
                            )}
                        </label>
                    )}

                    {renderInput(field)}

                    {errors[field.name]?.map((error, index) => (
                        <p key={index} className={`text-sm ${currentTheme.error}`}>
                            {error}
                        </p>
                    ))}
                </div>
            ))}

            <button
                type="submit"
                className={`w-full px-4 py-2 rounded-lg transition-colors ${currentTheme.button}`}
            >
                {submitText}
            </button>
        </form>
    );
};

CForm.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            label: PropTypes.string,
            type: PropTypes.string,
            placeholder: PropTypes.string,
            validations: PropTypes.shape({
                required: PropTypes.bool,
                email: PropTypes.bool,
                minLength: PropTypes.number,
                maxLength: PropTypes.number,
                fileType: PropTypes.arrayOf(PropTypes.string),
                maxFileSize: PropTypes.number,
            }),
            accept: PropTypes.string,
            props: PropTypes.object,
        })
    ).isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitText: PropTypes.string,
    className: PropTypes.string,
    theme: PropTypes.oneOf(["light", "dark"]),
};

export default CForm;

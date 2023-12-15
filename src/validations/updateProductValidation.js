import * as Yup from "yup";

export const updateProductFormInitialValue = {
  name: "",
  price: 0,
  currency: "",
  categoryName: "",
  img: "",
  description: "",
};

export const updateProductValidationSchema = Yup.object({
  name: Yup.string().required("Name required"),
  price: Yup.number()
    .required("Price required")
    .positive("Price must be positive"),
  categoryName: Yup.string(),
  img: Yup.string().required("İmage url required").url("Enter a valid URL"),
  description: Yup.string(),
});

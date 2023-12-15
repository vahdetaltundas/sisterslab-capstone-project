import * as Yup from "yup";

export const updateCategoryFormInitialValue = {
  name: "",
  img: "",
};

export const updateCategoryValidationSchema = Yup.object({
  name: Yup.string().required("Enter your name"),
  img: Yup.string().required("Enter your img url").url("Enter a valid URL"),
});

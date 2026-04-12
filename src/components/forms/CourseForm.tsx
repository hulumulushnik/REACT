import { useForm } from "react-hook-form";

interface CourseInputs {
  title: string;
  description: string;
}

export const CourseForm = ({ initialData, onSubmit }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CourseInputs>({
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Назва курсу</label>
        <input {...register("title", { required: "Це поле обов'язкове" })} />
        {errors.title && <span>{errors.title.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Збереження..." : "Зберегти курс"}
      </button>
    </form>
  );
};

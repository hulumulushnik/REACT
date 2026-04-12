import { useParams } from "react-router-dom";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="page">
      <h1>Деталі курсу #{id}</h1>
      <div className="course-info">
        <h3>Програма навчання</h3>
        <p>Тут буде опис курсу, список лекцій та матеріали.</p>
        <button className="btn-primary">Записатися на курс</button>
      </div>
    </div>
  );
};
export default CourseDetails;

import Content from './Content/Content'
import Header from './Header/Header'
import Total from './Total/Total'

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total course={course} />
    </div>
  )
}

export default Course

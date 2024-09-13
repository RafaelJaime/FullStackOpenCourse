const Total = ({ course }) => {
  const total = course.parts.reduce((s, p) => {
    console.log('Accumulating:', s, p.exercises)
    return s + p.exercises
  }, 0)
  console.log(total)
  return <b>total of {total} exercises</b>
}

export default Total

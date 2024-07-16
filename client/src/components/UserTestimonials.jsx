import SectionTitle from "./SectionTitle"
import TestimonialCard from "./TestimonialCard"
const data=[
  {
    "id" : "1",
    "name": "Nirwan Gupta",
    "photo": "https://res.cloudinary.com/drnrsxnx9/image/upload/v1721148578/Lost-and-Found/tmp-1-1721148532765_cooced.jpg",
    "testimonial": "This platform has been incredibly useful in helping me find my lost items. The community is very responsive and supportive.",
    "role": "Student, Computer Engineering"
  },
  {
    "id" :"2",
    "name": "Rohit Chauhan",
    "photo": "https://res.cloudinary.com/drnrsxnx9/image/upload/v1721148642/Lost-and-Found/tmp-2-1721148596180_wsmldd.jpg",
    "testimonial": "I found a valuable item and was able to return it to its rightful owner through this website. Great initiative!",
    "role": "Professor, Mechanical Engineering"
  }
]

const UserTestimonials = () => {
  return (
    <div className="py-20">
        <SectionTitle text='User Testimonials'/>
        <div className="mt-8 grid gap-4 lg:grid-cols-2 place-items-center">
            {data.map((item)=>{
                return <TestimonialCard id={item.id} item={item} />
            })}
        </div>
    </div>
  )
}
export default UserTestimonials
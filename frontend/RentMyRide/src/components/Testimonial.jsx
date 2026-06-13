import React from 'react'
import Title from './Title';
import { assets } from '../assets/assets';
import {motion} from 'framer-motion' ; 

const Testimonial = () => {
    const Star = ({ filled }) => (
		<svg
			className="w-4 h-4 text-yellow-400"
			fill={filled ? "currentColor" : "none"}
			stroke="currentColor"
			strokeWidth="1.5"
			viewBox="0 0 24 24"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 17.25l-6.16 3.73 1.64-7.03L2.5 9.77l7.19-.61L12 2.5l2.31 6.66 7.19.61-5 4.18 1.64 7.03z"
			/>
		</svg>
	);
    const testimonials = [
		{
			id: 1,
			name: "Emma Rodriguez",
			address: "Barcelona, Spain",
			image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
			rating: 5,
			review: "I've rented cars from various companies, but the experience with CarRental was exceptional",
		},
		{
			id: 2,
			name: "Lara Johnson",
			address: "New York, USA",
			image: assets.testimonial_image_2,
			rating: 4,
			review: "I’m truly impressed by the quality and consistency. The entire process was smooth, and the results exceeded all expectations. Thank you!",
		},
		{
			id: 3,
			name: "Sophia Lee",
			address: "Seoul, South Korea",
			image: assets.testimonial_image_1,
			rating: 5,
			review: "Fantastic experience! From start to finish, the team was professional, responsive, and genuinely cared about delivering great results.",
		},
	];
  return (
		<div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
			
            <Title title="What our customers say"  subTitle="Discover why discerning travelers choose CarRental for their luxury rides around the world."></Title>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
				{testimonials.map((testimonial , index ) => (
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: index*0.2 ,ease:"easeOut" }}
						viewport={{once:true , amount:0.3}}
						key={testimonial.id}
						className="bg-white p-6 rounded-xl shadow max-w-xs"
					>
						<div className="flex items-center gap-3">
							<img
								className="w-12 h-12 rounded-full"
								src={testimonial.image}
								alt={testimonial.name}
							/>
							<div>
								<p className="font-playfair text-xl">
									{testimonial.name}
								</p>
								<p className="text-gray-500">
									{testimonial.address}
								</p>
							</div>
						</div>
						<div className="flex items-center gap-1 mt-4">
							{Array(5)
								.fill(0)
								.map((_, index) => (
									<Star
										key={index}
										filled={testimonial.rating > index}
									/>
								))}
						</div>
						<p className="text-gray-500 max-w-90 mt-4">
							"{testimonial.review}"
						</p>
					</motion.div>
				))}
			</div>
		</div>
  );
}

export default Testimonial
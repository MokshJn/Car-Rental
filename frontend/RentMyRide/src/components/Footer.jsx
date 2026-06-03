import React from 'react'
import {assets} from '../assets/assets'
import {motion} from 'framer-motion'; 

const Footer = () => {
  return (
		<motion.footer 
		initial={{opacity:0 , y:30}}
		whileInView={{opacity:1 , y:0}}
		transition={{duration:0.6 , ease:"easeOut"}}
		
		className="px-6 md:px-16 lg:px-24 xl:px-32 w-full text-sm text-gray-500">
			<motion.div 
			initial={{opacity:0 , y:30}} 
			whileInView={{opacity:1 , y:0}}
			transition={{duration:0.6 ,delay:0.2}} 

			className="flex flex-col md:flex-row items-start justify-center gap-10 py-10 border-b border-gray-500/30">
				<div className="max-w-96">
					<motion.img 
					initial={{opacity:0 }}
					whileInView={{opacity:1 }}
					transition={{duration:0.6 , delay:0.4}}
					src={assets.logo} alt="" />

					<motion.p 
					initial={{opacity:0 }}
					whileInView={{opacity:1 }}
					transition={{duration:0.6 , delay:0.6}}
					className="mt-5 text-sm text-gray-500">
						Premium Car Rental service with a wide selection of
						luxury vehicles for all your driving needs.
					</motion.p>
					<motion.div 
					initial={{opacity:0 }}
					whileInView={{opacity:1 }}
					transition={{duration:0.5 , delay:0.5}}

					className="flex items-center gap-2 mt-7">
						<a href="#">
							<img
								src={assets.facebook_logo}
								alt=""
								className="w-5 h-5"
							/>
						</a>
						<a href="#">
							<img
								src={assets.instagram_logo}
								alt=""
								className="w-5 h-5"
							/>
						</a>
						<a href="#">
							<img
								src={assets.twitter_logo}
								alt=""
								className="w-5 h-5"
							/>
						</a>
						<a href="#">
							<img
								src={assets.gmail_logo}
								alt=""
								className="w-5 h-5"
							/>
						</a>
					</motion.div>
				</div>
				
				<motion.div
				initial={{opacity:0 , y:20 }}
				whileInView={{opacity:1 , y:0}}
				transition={{duration:0.6 , delay:0.4}}
				
				className="w-1/2 flex flex-wrap md:flex-nowrap justify-around">
					<div>
						<h2 className="font-semibold text-gray-900 mb-5">
							RESOURCES
						</h2>
						<ul className="text-sm text-gray-500 space-y-2 list-none">
							<li>
								<a href="#">Help Center</a>
							</li>
							<li>
								<a href="#">Terms of Services </a>
							</li>
							<li>
								<a href="#">Privacy Policy</a>
							</li>
							<li>
								<a href="#">Insurance</a>
							</li>
						</ul>
					</div>
					<div>
						<h2 className="font-semibold text-gray-900 mb-5">
							QUICK LINKS
						</h2>
						<div className="text-sm text-gray-500 space-y-2 list-none">
							<li>
								<a href="#">Home</a>
							</li>
							<li>
								<a href="#">Browse Cars</a>
							</li>
							<li>
								<a href="#">List Your Car </a>
							</li>
							<li>
								<a href="#">About Us</a>
							</li>
						</div>
					</div>

					<div>
						<h2 className="font-semibold text-gray-900 mb-5">
                            Contact
						</h2>
						<div className="text-sm text-gray-500 space-y-2 list-none">
							<li>
								1234 Luxury Drive
							</li>
							<li>
								San Francisco, CA 94126
							</li>
							<li>
                                (123) 456-7890
							</li>
							<li>
								info@carrental.com
							</li>
						</div>
					</div>
				</motion.div>
			</motion.div>
			<motion.p 
			initial ={{opacity:0 , y:20} } 
			whileInView={{opacity:1 , y:0}}
			transition={{duration:0.6 , delay:0.2}}
			className="py-4 text-center text-xs md:text-sm text-gray-500">
				Copyright {new Date().getFullYear()} © <a href="">CarRental</a>. All Right Reserved.
			</motion.p>
		</motion.footer>
  );
}

export default Footer
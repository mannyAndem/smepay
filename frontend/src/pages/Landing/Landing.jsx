import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import heroImg from "../../assets/ipad-mockup.png";
import featuresInvoices from "../../assets/feature-invoices.png";
import featuresAlert from "../../assets/features-alert.png";
import featuresEfficiency from "../../assets/features-efficiency.png";
import featuresSecure from "../../assets/features-secure.png";
import featuresTracking from "../../assets/features-tracking.png";
import featuresUser from "../../assets/features-user.png";
import arrow from "../../assets/arrow.png";
import getStartedImg from "../../assets/get-started-img.png";
import johnImg from "../../assets/John.png";
import gloryImg from "../../assets/Glory.png";
import aliceImg from "../../assets/Alice.png";
import macbookMockup from "../../assets/macbook-mockup.png";

const Landing = () => {
  return (
    <div className="bg-gray">
      <Navbar />
      <main>
        <section className="flex flex-col items-center gap-8 py-24 px-36">
          <h1 className="text-[3.5rem] text-paleDark font-semibold text-center">
            Effortless Payment
            <br /> Management for small businesses
          </h1>
          <p className="text-dark text-2xl text-center">
            Streamline your invoicing and payment tracking with our intuitive
            app
          </p>
          <div>
            <img
              src={heroImg}
              alt="View of SMEPAY dashboard on an Ipad device."
              className="w-full"
            />
          </div>
        </section>
        <section className="px-24 py-16">
          <h2 className="text-center text-xl">Features</h2>
          <span className="block text-center text-3xl">
            What can you expect?
          </span>
          <div className="mt-12 grid grid-cols-3 gap-8 ">
            <div className=" col-span-1 bg-white flex flex-col px-8 pt-4 pb-10 rounded-sm shadow-sm items-center text-center">
              <img src={featuresInvoices} className="mb-8" />/
              <h3 className="text-2xl font-semibold mb-4">
                Professional Invoices
              </h3>
              <p className="text-xl">
                Create polished and professional invoices that reflect the
                quality of your services, enhancing your business image.
              </p>
            </div>
            <div className=" col-span-1 bg-white flex flex-col px-8 pt-4 pb-10 rounded-sm shadow-sm items-center text-center">
              <img src={featuresSecure} className="mb-8" />/
              <h3 className="text-2xl font-semibold mb-4">
                Secure and reliable
              </h3>
              <p className="text-xl">
                Rest easy with our secure and reliable platform, ensuring the
                safety of your financial data and transactions.
              </p>
            </div>
            <div className=" col-span-1 bg-white flex flex-col px-8 pt-4 pb-10 rounded-sm shadow-sm items-center text-center">
              <img src={featuresAlert} className="mb-8" />/
              <h3 className="text-2xl font-semibold mb-4">
                Alert for unpaid invoices
              </h3>
              <p className="text-xl">
                Receive instant alerts for unpaid invoices, ensuring a healthy
                cash flow for your business.
              </p>
            </div>
            <div className=" col-span-1 bg-white flex flex-col px-8 pt-4 pb-10 rounded-sm shadow-sm items-center text-center">
              <img src={featuresTracking} className="mb-8" />/
              <h3 className="text-2xl font-semibold mb-4">
                Real-time payment tracking
              </h3>
              <p className="text-xl">
                Stay in the loop with real-time payment tracking, empowering you
                to make informed decisions for your business.
              </p>
            </div>
            <div className=" col-span-1 bg-white flex flex-col px-8 pt-4 pb-10 rounded-sm shadow-sm items-center text-center">
              <img src={featuresEfficiency} className="mb-8" />/
              <h3 className="text-2xl font-semibold mb-4">
                Efficiency and time savings
              </h3>
              <p className="text-xl">
                Streamline your payment processes and save valuable time with
                our efficient and user-friendly platform.
              </p>
            </div>
            <div className=" col-span-1 bg-white flex flex-col px-8 pt-4 pb-10 rounded-sm shadow-sm items-center text-center">
              <img src={featuresUser} className="mb-8" />/
              <h3 className="text-2xl font-semibold mb-4">
                User friendly interface
              </h3>
              <p className="text-xl">
                Experience a seamless and intuitive interface that requires
                minimal learning, allowing you to focus on what matter most-
                your business.
              </p>
            </div>
          </div>
        </section>
        <section className="px-32 py-16">
          <h2 className="flex items-center gap-2 text-xl">
            How we work <img src={arrow} />
          </h2>
          <span className="mt-4 block text-center text-3xl">
            Want to enjoy these benefits?
          </span>
          <div className="mt-20 flex justify-between gap-16 items-end">
            <div className="w-full flex flex-col items-start">
              <div className="flex items-center gap-8">
                <div className="w-6 h-6 rounded-full bg-blue"></div>
                <span className="text-2xl whitespace-nowrap">
                  Sign up for free
                </span>
              </div>
              <div className="my-4 ml-2 border-l-4 border-dotted border-blue w-full h-[200px]"></div>
              <div className="flex items-center gap-8">
                <div className="w-6 h-6 rounded-full bg-blue"></div>
                <span className="text-2xl whitespace-nowrap">
                  Create your first Invoice
                </span>
              </div>
              <div className="my-4 ml-2 border-l-4 border-dotted border-blue w-full h-[200px]"></div>
              <div className="flex items-center gap-8">
                <div className="w-6 h-6 rounded-full bg-blue"></div>
                <span className="text-2xl whitespace-nowrap">
                  Effortlessly manage payment
                </span>
              </div>
            </div>
            <div className="w-full">
              <img src={getStartedImg} className="w-full" />
            </div>
          </div>
        </section>
        <section className="px-32 py-16">
          <h2 className="text-center text-3xl mb-4">Testimonials</h2>
          <span className="text-center block">
            See what our clients are saying
          </span>
          <div className="mt-20 grid grid-cols-3 gap-8 ">
            <div className="bg-white rounded-md shadow-sm pb-6 overflow-hidden">
              <div className="w-full">
                <img
                  src={aliceImg}
                  className="w-full"
                  alt="Alice of Wonderland Bakery"
                />
              </div>
              <div className="px-6 text-center mt-8">
                <p className="text-sm text-[#667085]">
                  “Managing payments was a breeze with this app. I could easily
                  create profile for all my clients, keep track of transactions
                  and receive instant alerts for any overdue invoices...
                </p>
                <span className="font-semibold block mt-4">
                  Alice, owner of Wonderland Bakery
                </span>
              </div>
            </div>
            <div className="bg-white rounded-md shadow-sm pb-6 overflow-hidden">
              <div className="w-full">
                <img
                  src={johnImg}
                  className="w-full"
                  alt="Alice of Wonderland Bakery"
                />
              </div>
              <div className="px-6 text-center mt-8">
                <p className="text-sm text-[#667085]">
                  “As a small tech company, efficient payment management is
                  crucial. The app has become an indispensable tool for keeping
                  our financial operations smooth and error-free...
                </p>
                <span className="font-semibold block mt-4">
                  John, CEO of Tech Innovate Solutions
                </span>
              </div>
            </div>
            <div className="bg-white rounded-md shadow-sm pb-6 overflow-hidden">
              <div className="w-full">
                <img
                  src={gloryImg}
                  className="w-full"
                  alt="Alice of Wonderland Bakery"
                />
              </div>
              <div className="px-6 text-center mt-8">
                <p className="text-sm text-[#667085]">
                  “This app transformed the way we handle payments at our flower
                  shop. It’s user-friendly. efficient, and has truly simplified
                  our invoicing process....read more
                </p>
                <span className="font-semibold block mt-4">
                  Glory, founder of Bloom Florist
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-16  pl-32 flex items-center justify-between gap-16">
          <div className="flex items-start flex-col gap-4">
            <h2 className="text-2xl font-semibold">
              Ready to transform your payment management?
            </h2>
            <p className="text-xl">
              Sign up for free and experience the difference
            </p>
            <Link
              to="/signup"
              className="rounded-md px-5 py-4 bg-blue text-gray"
            >
              Sign up now
            </Link>
          </div>
          <div>
            <img src={macbookMockup} className="w-full" />
          </div>
        </section>
      </main>
      <footer className="bg-veryDarkBlue px-32 py-12 ">
        <div className="border-lightGray border-b pb-8  flex justify-between">
          <span className="block text-2xl text-blue">SMEPAY</span>
          <div className="flex gap-32 text-gray font-semibold">
            <ul className="flex flex-col gap-3">
              <li>PRODUCT</li>
              <li>Invoice</li>
              <li>Tracking</li>
              <li>Transactions</li>
              <li>Pricing</li>
            </ul>
            <ul className="flex flex-col gap-3">
              <li>COMPANY</li>
              <li>About</li>
              <li>FAQ</li>
              <li>Blog</li>
            </ul>
            <ul className="flex flex-col gap-3">
              <li>LEGAL</li>
              <li>Terms</li>
              <li>Privacy</li>
              <li>Security</li>
            </ul>
          </div>
          <div className="text-sm font-[400] text-gray flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <FaFacebook color="white" size={24} />
              <FaInstagram color="white" size={24} />
              <FaTwitter color="white" size={24} />
              <FaLinkedin color="white" size={24} />
            </div>
            <span>123 Sparkle Street, Ikeja, Lagos, Nigeria</span>
            <span>contact@smepay.com</span>
            <span>+234 700 800 300 900</span>
          </div>
        </div>
        <div className="py-8 text-center text-gray">
          <span className="block">&copy; 2023 SMEPAY, All rights reserved</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

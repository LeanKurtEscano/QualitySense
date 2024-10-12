import React from 'react'

const OTP:React.FC = () => {
    return (
        <section className='flex items-center min-h-screen justify-center bg-darkbg'>
  <div className="relative  border-formcolor bg-loginbg border-2 rounded-lg shadow-xl  px-6 pt-10 pb-9  mx-auto w-full max-w-lg ">
    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className=" font-bold text-slate-200 text-3xl">
          <p>Email Verification</p>
        </div>
        <div className="flex flex-row text-sm font-medium text-gray-400">
          <p>We have sent a 6-digit verification code to your email address</p>
        </div>
      </div>

      <div>
        <form action="" method="post">
          <div className="flex flex-col space-y-16">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-sm space-x-2">
              {/* Input boxes */}
              {[...Array(6)].map((_, index) => (
                <div key={index} className="w-14 h-14">
                  <input
                    className="w-full h-full flex items-center text-white justify-center text-center text-lg px-5 outline-none rounded-xl border-formcolor border-2 bg-gray-900 focus:bg-gray-900 focus:ring-1 ring-cyan-500"
                    type="text"
                    maxLength={1} // Ensuring one character per box
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col space-y-5">
              <div>
                <button className="flex items-center justify-center w-full py-4  bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none dark:focus:ring-[#4285F4]/55  text-white text-sm rounded-xl shadow-sm">
                  Verify Account
                </button>
              </div>

              <div className="flex flex-row items-center justify-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't receive code?</p>
                <a className="text-cyan-500 hover:underline" href="/" target="_blank" rel="noopener noreferrer">Resend</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

    )
}

export default OTP
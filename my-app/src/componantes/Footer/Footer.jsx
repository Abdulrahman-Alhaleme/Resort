import React from 'react'

const Foot = () => {
  return (
    <div><footer className="bg-blue-900 text-gray-300">
    <div className="max-w-screen-xl mx-auto py-4 px-4">
      <div className="flex flex-wrap justify-between items-center">
        <div className="text-white">
          <p>&copy; {new Date().getFullYear()} Your Resort Name. All rights reserved.</p>
        </div>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-white hover:text-gray-100">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-100">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-100">
              FAQ
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer></div>
  )
}

export default Foot
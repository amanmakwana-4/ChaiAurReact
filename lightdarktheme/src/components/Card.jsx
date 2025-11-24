export default function Card() {
    return (
        <div className="w-full 
                        bg-white dark:bg-gray-800 
                        border border-gray-200 dark:border-gray-700 
                        text-gray-900 dark:text-white 
                        rounded-lg shadow">

            <a href="/">
                <img
                    className="p-8 rounded-t-lg"
                    src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                    alt="product_image1"
                />
            </a>

            <div className="px-5 pb-5">

                <h5 className="text-xl font-semibold tracking-tight 
                               text-gray-900 dark:text-white">
                    Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
                </h5>

                <div className="flex items-center mt-2.5 mb-5">
                    {[1,2,3,4].map(i => (
                        <svg
                            key={i}
                            className="w-4 h-4 text-yellow-300 mr-1"
                            aria-hidden="true"
                            viewBox="0 0 22 20"
                            fill="currentColor"
                        >
                            <path d="M20.924 7.625 ...Z" />
                        </svg>
                    ))}
                    <svg
                        className="w-4 h-4 text-gray-300 dark:text-gray-600"
                        aria-hidden="true"
                        viewBox="0 0 22 20"
                        fill="currentColor"
                    >
                        <path d="M20.924 7.625 ...Z" />
                    </svg>

                    <span className="ml-3 text-xs font-semibold 
                                     px-2.5 py-0.5 rounded
                                     bg-blue-100 text-blue-800 
                                     dark:bg-blue-200 dark:text-blue-900">
                        4.0
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold 
                                     text-gray-900 dark:text-white">
                        $599
                    </span>

                    <a href="/"
                        className="text-white 
                                   bg-blue-700 hover:bg-blue-800
                                   focus:ring-4 focus:ring-blue-300 
                                   dark:bg-blue-600 dark:hover:bg-blue-700 
                                   dark:focus:ring-blue-800
                                   px-5 py-2.5 rounded-lg text-sm" >
                        Add to cart
                    </a>
                </div>

            </div>
        </div>
    );
}

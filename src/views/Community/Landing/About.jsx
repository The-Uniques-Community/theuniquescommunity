import * as React from "react";

const About = (props) => (
    <div className="flex justify-center gap-16 md:flex-nowrap flex-wrap items-center px-3 pt-24">
        <div className="lg:w-1/2"><div className="lg:ml-auto  lg:mx-0  mx-auto" style={{ width: "80%" }}>
            <svg
                width="100%"
                height="auto"
                viewBox="0 0 342 265"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
            >
                <defs>
                    <clipPath id="aboutClip">
                        <path
                            d="M0 56V30C0 23.3726 5.37258 18 12 18H42C48.6274 18 54 23.3726 54 30V37C54 43.6274 59.3726 49 66 49H68C74.6274 49 80 43.6274 80 37V30C80 23.3726 85.3726 18 92 18H275C279.971 18 284 13.9706 284 9C284 4.02944 288.029 0 293 0H330C336.627 0 342 5.37258 342 12V79C342 85.6274 336.627 91 330 91H296C289.373 91 284 96.3726 284 103V167.5C284 169.985 286.015 172 288.5 172C290.985 172 293 169.985 293 167.5V151C293 144.373 298.373 139 305 139H330C336.627 139 342 144.373 342 151V181C342 187.627 336.627 193 330 193H304C297.925 193 293 197.925 293 204C293 210.075 297.925 215 304 215H330C336.627 215 342 220.373 342 227V253C342 259.627 336.627 265 330 265H305C298.373 265 293 259.627 293 253V232.5C293 230.015 290.985 228 288.5 228C286.015 228 284 230.015 284 232.5V253C284 259.627 278.627 265 272 265H92C85.3726 265 80 259.627 80 253V232C80 225.373 74.6274 220 68 220H35C28.3726 220 23 214.627 23 208V173.5C23 167.149 17.8513 162 11.5 162C5.14873 162 0 156.851 0 150.5V103C0 96.3726 5.37258 91 12 91H36.5C42.8513 91 48 85.8513 48 79.5C48 73.1487 42.8513 68 36.5 68H12C5.37258 68 0 62.6274 0 56Z"
                        />
                    </clipPath>
                </defs>
                {/* Image clipped to the custom path */}
                <image
                    href="https://images.unsplash.com/photo-1450133064473-71024230f91b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3V5JTIwaW4lMjBibGFjayUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D"
                    width="342"
                    height="265"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#aboutClip)"
                />
                {/* Optional overlay to emphasize the shape */}
                {/* <path
                d="M0 56V30C0 23.3726 5.37258 18 12 18H42C48.6274 18 54 23.3726 54 30V37C54 43.6274 59.3726 49 66 49H68C74.6274 49 80 43.6274 80 37V30C80 23.3726 85.3726 18 92 18H275C279.971 18 284 13.9706 284 9C284 4.02944 288.029 0 293 0H330C336.627 0 342 5.37258 342 12V79C342 85.6274 336.627 91 330 91H296C289.373 91 284 96.3726 284 103V167.5C284 169.985 286.015 172 288.5 172C290.985 172 293 169.985 293 167.5V151C293 144.373 298.373 139 305 139H330C336.627 139 342 144.373 342 151V181C342 187.627 336.627 193 330 193H304C297.925 193 293 197.925 293 204C293 210.075 297.925 215 304 215H330C336.627 215 342 220.373 342 227V253C342 259.627 336.627 265 330 265H305C298.373 265 293 259.627 293 253V232.5C293 230.015 290.985 228 288.5 228C286.015 228 284 230.015 284 232.5V253C284 259.627 278.627 265 272 265H92C85.3726 265 80 259.627 80 253V232C80 225.373 74.6274 220 68 220H35C28.3726 220 23 214.627 23 208V173.5C23 167.149 17.8513 162 11.5 162C5.14873 162 0 156.851 0 150.5V103C0 96.3726 5.37258 91 12 91H36.5C42.8513 91 48 85.8513 48 79.5C48 73.1487 42.8513 68 36.5 68H12C5.37258 68 0 62.6274 0 56Z"
                fill="#FF5733"
                fillOpacity="0.5"
            /> */}
            </svg>
        </div>
        </div>
        <div className="md:w-1/2 p-4">
            <div className="md:w-[80%] text-center">
                <p className="bg-[#fdf5e2]  lg:text-left p-2 text-2xl rounded-xl ">
                    Welcome to the world of captivating web design!
                </p>
                <p className=" text-6xl my-6">
                    I'm Jeffery Cannon
                </p>
                <p className="text-gray-500 text-sm text-left">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem molestiae ad nostrum accusamus aliquid atque, libero odio sunt rerum ipsum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda iste delectus cum, aut ullam libero corrupti corporis impedit veniam quos commodi similique quaerat. Consequatur dolorum amet eligendi dignissimos, autem error aliquam ex qui accusamus officia, id voluptate libero alias aspernatur quos repellat voluptatum, suscipit ullam repudiandae ipsum illo earum veritatis!
                </p>
                <div className="border border-1 border-r-0 border-l-0  border-[#5700FF] my-6">
                    <div className="flex my-1 gap-10 items-center">
                        <div>
                            <p className="text-4xl">50+</p>
                            <p className="text-sm text-gray-500">Lorem ipsum</p>
                        </div>
                        <div>
                            <p className="text-4xl">50+</p>
                            <p className="text-sm text-gray-500">Lorem ipsum</p>
                        </div>
                        <div>
                            <p className="text-4xl">50+</p>
                            <p className="text-sm text-gray-500">Lorem ipsum</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div >
);

export default About;

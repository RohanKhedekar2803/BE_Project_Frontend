import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";

export default function HorizontalCard({ data }) {
    return (
        <Card style={{ maxWidth: '60rem', marginLeft: '15rem' }}>
            {/* <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 shrink-0 rounded-r-none"
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader> */}

            
                <div style={{ background: "#bb6583"}} className=" pl-3 pt-3 rounded-tl-xl rounded-tr-xl">
                    <Typography variant="h5" color="white" className="mb-4 uppercase font-bold font-sans-serif">
                        {data?.name}
                    </Typography>
                </div>
                <CardBody style={{ background: "rgb(235 171 193)", color: "#713d71"}}  className="p-4 rounded-br-md rounded-bl-md">

                    <Typography variant="h5" color="#8b3a56" className="mb-2 font-bold font-sans-serif">
                        {data?.description}
                    </Typography>
                    <Typography color="black" className="mb-2 font-bold font-sans-serif">
                        Language : {data?.language}
                    </Typography>

                    <Typography color="black" className="mb-2 font-bold font-sans-serif">
                        Website :<a href={data?.homepage} target="_blank" rel="noopener noreferrer">
            {data?.homepage}
          </a>
                    </Typography>
{/* 
                    <div style={{color:"#8b3a56" }} className="w-full flex space-x-4">
                        <Typography color="#8b3a56" className="mb-2 font-bold font-sans-serif flex-grow">
                            Stars : {data?.stars}
                        </Typography>
                        <Typography color="#8b3a56" className="mb-2 font-bold font-sans-serif flex-grow">
                            Forks : {data?.forks}
                        </Typography>
                        <Typography color="#8b3a56" className="mb-2 font-bold font-sans-serif flex-grow">
                            Size : {data?.size}
                        </Typography>
                    </div> */}


                    {/* <a href={data?.url} target="_blank" className="">
                        <button style={{ background: "#bb6583"}} className=" hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            See More
                        </button>
                    </a> */}


                </CardBody>
            

        </Card>
    );
}
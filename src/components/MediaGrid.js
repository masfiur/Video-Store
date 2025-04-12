import React from "react";
import { Link } from "react-router-dom";

const MediaGrid = ({ title, mediaList, mediaType }) => {
  return (
    <>
      

      <div className="container mt-4 mb-5">
        <h1 className="mb-4">{title}</h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {mediaList.map((item) => (
            <div className="col" key={item.id}>
              <Link 
                to={`/${mediaType}/${item.id}`} 
                className="text-decoration-none"
              >
                <div className="card h-100 shadow" style={{ borderRadius: "15px" }}>
                  <div style={{ height: "480px", borderRadius: "15px", overflow: "hidden" }}>
                    <img 
                      src={item.image} alt={item.title} className="card-img-top h-100 w-100" style={{ objectFit: "cover" }}
                    />
                  </div>
                  
                  {/* <div className="card-body">
                    <h5 className="card-title text-dark">{item.title}</h5>
                  </div> */}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default MediaGrid;
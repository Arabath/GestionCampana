import React from "react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Typography } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const AdminDogPictures = ({ matchesSM, dataDog }) => {
  const picturesPosition = [
    { id: dataDog?.photosId.frente, position: "Frente" },
    { id: dataDog?.photosId.trasera, position: "Trasera" },
    { id: dataDog?.photosId.latIzq, position: "Lateral Izq." },
    { id: dataDog?.photosId.latDer, position: "Lateral Der." },
    { id: dataDog?.photosId.tresCuartosDcho, position: "Tres cuartos Der." },
    { id: dataDog?.photosId.tresCuartosIzq, position: "Tres cuartos Izq." },
  ];
  return (
    <Box sx={{ height: "350px", width: matchesSM ? "550px" : "350px" }}>
      <Typography variant="h6" fontWeight="bold"
        sx={{
          textTransform: "uppercase",
          color: "#4428a2",
          alignSelf: "flex-start",
          paddingLeft: "2.5%",
        }}
      >
        Fotos:
      </Typography>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {picturesPosition?.map((photo) => (
          <SwiperSlide>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{alignSelf: "flex-start", ml: "30px"}}>{photo.position}</Typography>
              <Box
                component="img"
                src={`http://192.168.10.82:7044/Storage/static/${photo.id}`}
                sx={{ height: "90%", width: "90%", objectFit: "contain", alignSelf: "center", borderRadius: "5px" }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default AdminDogPictures;

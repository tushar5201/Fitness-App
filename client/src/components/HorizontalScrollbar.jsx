import { Box, Stack, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HorizontalScrollbar = ({ data, bodyPart, setBodyPart }) => {

    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 5,
        swipeToSlide: true,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    }

    return (
        <Slider {...settings}>
            {data.map((item) => (
                <Box key={item} itemId={item.id || item} title={item.id || item} m="0 40px">
                    <Stack
                        type="button"
                        alignItems="center"
                        justifyContent="center"
                        className="bodyPart-card"
                        sx={{
                            borderTop: bodyPart === item ? "4px solid #007AFF" : "",
                            backgroundColor: "#fff",
                            borderBottomLeftRadius: "20px",
                            width: "270px",
                            height: "280px",
                            cursor: "pointer",
                            gap: "47px"
                        }}
                        onClick={() => {
                            setBodyPart(item);
                            window.scrollTo({ top: 500, left: 100, behavior: "smooth" })
                        }}
                    >
                        <img src="/gym.jpeg" alt="gym" style={{ width: "40px", height: "40px" }} />
                        <Typography fontSize="24px" fontWeight="bold" textTransform="capitalize">{item}</Typography>
                    </Stack>
                </Box>
            ))}
        </Slider>
    )
}

export default HorizontalScrollbar;
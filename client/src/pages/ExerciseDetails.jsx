import {  Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { exerciseOptions, fetchData } from "../utils/fetchData";

const ExerciseDetails = () => {
    const [exerciseDetail, setExerciseDetail] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchExerciseData = async () => {
            const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";

            const ExerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
            setExerciseDetail(ExerciseDetailData);
        }

        fetchExerciseData();
    }, [id]);

    const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;

    const extraDetails = [
        {
            icon: "/images/bodypart.jpeg",
            name: bodyPart
        },
        {
            icon: "/images/target.jpeg",
            name: target
        },
        {
            icon: "/images/equipment.jpeg",
            name: equipment
        }
    ]
    return (
        <Stack gap={"60px"} sx={{ flexDirection: { lg: "row" }, p: "20px", alignItems: "center" }}>
            <img src={gifUrl} alt={name} loading="lazy" className="detail-image" />
            <Stack sx={{gap: {lg: "35px", xs: "20px"}}}>
                <Typography variant="h3">{name}</Typography>
                <Typography variant="h6">
                    Exercises kapp you strong. {name} {` `}
                    is one of the best exercises to target your {target} it will help you to improve your mood & gain energy.
                </Typography>

                {extraDetails.map((item) => (
                    <Stack key={item.name} direction={"row"} gap="24px" alignItems={"center"}>
                        <Button sx={{background: "#fff2db", borderRadius: "50%", width: "100px", height: "100px"}}>
                            <img src={item.icon} alt={item.name} style={{width: "50px", height: "50px"}} />
                        </Button>
                        <Typography textTransform={"capitalize"} variant="h5">{item.name}</Typography>
                    </Stack>
                ))}
            </Stack>
        </Stack>

    )
}

export default ExerciseDetails;
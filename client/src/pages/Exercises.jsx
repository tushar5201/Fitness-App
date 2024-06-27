import { Box, Button, Pagination, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import { Col, Row } from "react-bootstrap";


const Exercises = ({ exercise, bodyPart, setExercise }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [exercisesPerPage] = useState(9);

    useEffect(() => {
        const fetchExerciseData = async () => {
            let exerciseData = [];
            if (bodyPart === "all") {
                exerciseData = await fetchData("https://exercisedb.p.rapidapi.com/exercises?limit=1000", exerciseOptions);
            } else {
                exerciseData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=1000`, exerciseOptions);
            }
            setExercise(exerciseData);
        }

        fetchExerciseData();
    }, [bodyPart, setExercise]);

    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    const currentExercises = exercise.slice(indexOfFirstExercise, indexOfLastExercise);

    const paginate = (event, value) => {
        setCurrentPage(value);

        window.scrollTo({ top: 1800, behavior: 'smooth' });
    };

    return (
        <Box
        className="exercises"
            id="exercises"
            mt="50px"
            p="20px"
        >
            <Typography variant="h3" mb="46px">Showing Results</Typography>
            {/* <Stack direction="row" sx={{ gap: { lg: "110px", xs: "50px" } }} flexWrap="wrap" justifyContent="center"> */}
            <Row>
                {currentExercises.map((ex, index) => (
                    <Col md={4}>
                        <Link key={index} to={`/exercise/${ex.id}`} className="exercise-card">
                            <img src={ex.gifUrl} alt={ex.name} loading="lazy" />
                            <Stack direction="row">
                                <Button sx={{ ml: "21px", color: "#fff", background: "#ffa9a9", fontSize: "14px", borderRadius: "20px", textTransform: "capitalize" }}>
                                    {ex.bodyPart}
                                </Button>
                                <Button sx={{ ml: "21px", color: "#fff", background: "#fcc757", fontSize: "14px", borderRadius: "20px", textTransform: "capitalize" }}>
                                    {ex.target}
                                </Button>
                            </Stack>
                            <Typography ml="21px" color="#000" fontWeight="bold" mt="11px" pb="10px" textTransform="capitalize" fontSize={"22px"}>{ex.name}</Typography>
                        </Link>
                    </Col>
                ))}
            </Row>
            {/* </Stack> */}

            <Stack mt={"100px"} alignItems={"center"}>
                {exercise.length > 10 && (
                    <Pagination
                        color="primary"
                        shape="rounded"
                        defaultPage={1}
                        count={Math.ceil(exercise.length / exercisesPerPage)}
                        page={currentPage}
                        onChange={paginate}
                        size="large"
                    />
                )}
            </Stack>
        </Box >
    )
}

export default Exercises;
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { exerciseOptions, fetchData } from '../utils/fetchData';
import Exercises from './Exercises';
import HorizontalScrollbar from '../components/HorizontalScrollbar';

const Tutorial = () => {

    const [search, setSearch] = useState("");
    const [exercise, setExercise] = useState([]);
    const [bodyPart, setBodyPart] = useState('all');
    const [bodyParts, setBodyParts] = useState([]);

    useEffect(() => {
        const fetchExerciseData = async () => {
            const bodyPartsData = await fetchData("https://exercisedb.p.rapidapi.com/exercises/bodyPartList", exerciseOptions);
            setBodyParts(['all', ...bodyPartsData]);
        }
        fetchExerciseData();
    }, [])

    const getData = async () => {
        if (search) {
            const exerciseData = await fetchData("https://exercisedb.p.rapidapi.com/exercises?limit=1000", exerciseOptions);
            const searchedExercise = exerciseData.filter(
                (exercise) => exercise.name.toLowerCase().includes(search)
                    || exercise.target.toLowerCase().includes(search)
                    || exercise.equipment.toLowerCase().includes(search)
                    || exercise.bodyPart.toLowerCase().includes(search)
            )

            setSearch("");
            setExercise(searchedExercise);
        }
    }
    const width = window.innerWidth;

    return (
        <Container>
            <Row>
                <Col md={10}>
                    <input type="text" name="exercise" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Enter Exercise Name' className="form-control" />
                </Col>
                <Col md={2}>
                    <Button className="btn btn-primary" onClick={getData}>Search</Button>
                </Col>
            </Row>
            {width > 450 && (
                <div>
                    <HorizontalScrollbar data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart} />
                </div>
            )}
            <Exercises exercise={exercise} bodyPart={bodyPart} setExercise={setExercise} />
        </Container>
    );
};

export default Tutorial;
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Card, ListGroup, Placeholder, Spinner } from "react-bootstrap";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [movieId, setMovieId] = useState(1);

  const [movie, setMovie] = useState(null);

  const getMovie = useCallback(() => {
    setIsLoading(true);
    axios
      .get(`https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`)
      .then((response) => {
        if (response.status === 200) {
          // console.log(response.data.data.movie);
          setMovie(response.data.data.movie);
        } else {
          alert(`잘못된 데이터 입니다.(${response.status})`);
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          alert("페이지가 없습니다.");
        } else {
          alert(
            `문제가 발생하였습니다. 개발자에게 연락주세요.(${error.response.status})`
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [movieId]);

  useEffect(() => {
    getMovie();
  }, [movieId]);

  return (
    <div>
      {isLoading || movie == null ? (
        <Card style={{ width: "500px" }}>
          <Card.Header>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={4} /> <Placeholder xs={1} />
                <Placeholder xs={3} />
                <Placeholder xs={1} /> <Placeholder xs={3} />
                <Placeholder xs={4} />
                <Placeholder xs={3} />
                <Placeholder xs={2} /> <Placeholder xs={3} />
              </Placeholder>
            </ListGroup.Item>
            <ListGroup.Item>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={3} />
              </Placeholder>
            </ListGroup.Item>
            <ListGroup.Item>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={2} />
              </Placeholder>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      ) : (
        <Card style={{ width: "500px" }}>
          <Card.Header>제목 : {movie.title}</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>설명 : {movie.description_intro}</ListGroup.Item>
            <ListGroup.Item>⭐ : {movie.rating}/10</ListGroup.Item>
            <ListGroup.Item>👍 : {movie.like_count}</ListGroup.Item>
          </ListGroup>
        </Card>
      )}
      <button
        onClick={() =>
          setMovieId((prev) => {
            if (prev < 2) {
              alert("맨 앞 입니다.");
              return 1;
            } else {
              return prev - 1;
            }
          })
        }
        disabled={isLoading}
      >
        {isLoading ? (
          <div>
            <Spinner animation="border" size="sm" />
            로딩 중...
          </div>
        ) : (
          "이전 글 보기"
        )}
      </button>
      <button
        onClick={() => setMovieId((prev) => prev + 1)}
        disabled={isLoading}
      >
        {isLoading ? (
          <div>
            <Spinner animation="border" size="sm" />
            로딩 중...
          </div>
        ) : (
          "다음글 보기"
        )}
      </button>
    </div>
  );
};

export default App;

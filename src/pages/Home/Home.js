import { git } from "../../utils";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Chip, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { updateRepoData } from "../../redux/repoSlice";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const Home = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((store) => store.repoSlice);

  useEffect(() => {
    (async () => {
      const response = await git.get(
        `search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${page}`
      );
      dispatch(updateRepoData(response.data.items));
      setLoading(false);
    })();
  }, [page, dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (elem) {
      console.log("error", elem);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          gap: "20px",
          padding: "20px 40px",
        }}
      >
        {data?.map((elem, i) => {
          return (
            <Card
              sx={{
                display: "flex",
                gap: "3rem",
              }}
              key={i}
            >
              <CardMedia
                component="img"
                sx={{ width: 160 }}
                image={
                  elem?.owner?.avatar_url !== "N/A"
                    ? elem?.owner?.avatar_url
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png?20210219185637"
                }
                alt="Live from space album cover"
              />
              <CardContent sx={{ justifySelf: "center" }}>
                <Stack
                  spacing={1.5}
                  alignItems="flex-start"
                  justifyContent="flex-start"
                >
                  <Typography component="div" variant="h5">
                    {elem?.full_name.split("/")[1]}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                    width="75%"
                  >
                    {elem?.description}
                  </Typography>

                  <Stack sx={{ flexDirection: "row", gap: "10vw" }}>
                    <Stack sx={{ flexDirection: "row", gap: "10px" }}>
                      <Chip label={`${elem.stargazers_count} ⭐`} />
                      <Chip label={`${elem.open_issues_count} Issues`} />
                    </Stack>
                    <Stack>
                      <Typography component="p" fontSize="1.5ch">
                        Last Pushed {moment(elem.pushed_at).fromNow()} by{" "}
                        {elem?.owner.login}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
              <Stack display="flex" justifyContent="center">
                <Button
                  sx={{ textTransform: "capitalize" }}
                  variant="text"
                  onClick={() =>
                    navigate(
                      `/details/${elem.owner.login}/${
                        elem.full_name.split("/")[1]
                      }`
                    )
                  }
                >
                  Commit Activity &nbsp;
                  <ArrowForwardIosIcon />
                </Button>
              </Stack>
            </Card>
          );
        })}
      </Stack>
      {loading && <Loader />}
    </div>
  );
};

export default Home;

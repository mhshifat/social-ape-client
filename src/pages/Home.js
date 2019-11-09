import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Profile from "../components/Profile";
import { renderScreams } from "../helpers/jsxRender";
import { getScreamsAction } from "../store/actions/dataActions";

const Home = React.memo(({ ui, data, getScreamsAction }) => {
  const { loading } = ui;
  const { screams } = data;

  useEffect(() => {
    getScreamsAction();
  }, [getScreamsAction]);

  return loading ? (
    "Loading..."
  ) : (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {renderScreams(screams)}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
});

const mapStateToProps = ({ ui, data }) => ({ ui, data });

const mapDispatchToProps = {
  getScreamsAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

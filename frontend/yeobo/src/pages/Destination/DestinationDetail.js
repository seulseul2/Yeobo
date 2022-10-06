import classes from './DestinationDetail.module.scss';

const Main = () => {
  return (
    <div className={classes.DestinationDetail}>
      <div className={classes.DestinationTop}>
        <p className={classes.destTitle}>destination detail</p>
        <div className={classes.imageWrap}>
          <img className={classes.image} src="https://w.namu.la/s/6f490388edd0eb0595b633808b7f9d4a4251ef5f33052b34a8f104a7b872676191869533df4148d6b540c5191c3651c6e492c4cb1502b8f1a62ba16a194f75b830f2e42d3496fe77d8c553746be4b71e456c248594227644a9ef0000658c42c8d55973c79e1b17e5f16ec0762b7d776f" alt="destination"/>
        </div>
      </div>
    </div>
  );
};

export default Main;
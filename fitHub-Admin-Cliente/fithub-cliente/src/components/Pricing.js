import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import AuthService from '../services/AuthService';
import { render } from '@testing-library/react';
import PlanService from '../services/PlanService';



const styles = theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
});

class Pricing extends Component{

  constructor(props){
    super(props);
    this.reservarPlan = this.reservarPlan.bind(this)
  }

  reservarPlan(e, id){
    e.preventDefault();
    let user = AuthService.getCurrentUser()
    if(user == null){
      alert("Ingrese para poder adquirir un plan")
    }else if(user.Rol == "USER"){
      PlanService.reservarPlan(id)
      this.props.reloadInfo();
      window.location.reload();
    }
  }

  render(){
    const {tier, classes} = this.props;

    return (
      <Grid item key={tier.id} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
        <Card>
          <CardHeader
            title={tier.title}
            subheader={tier.subheader}
            titleTypographyProps={{ align: 'center' }}
            subheaderTypographyProps={{ align: 'center' }}
            action={tier.title === 'Pro' ? <StarIcon /> : null}
            className={classes.cardHeader}
          />
          <CardContent>
            <div className={classes.cardPricing}>
              <Typography component="h2" variant="h3" color="textPrimary">
                ${tier.price}
              </Typography>
              <Typography variant="h6" color="textSecondary">
                /cop
              </Typography>
            </div>
            <ul>
              {tier.description.map((line) => (
                <Typography component="li" variant="subtitle1" align="center" key={line}>
                  {line}
                </Typography>
              ))}
            </ul>
          </CardContent>
          <CardActions>
            <Button fullWidth variant={tier.buttonVariant} color="primary" onClick={(e) => {this.reservarPlan(e, tier.id)}}>
              {tier.buttonText}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  
  }

}

Pricing.propTypes = {
  classes: PropTypes.object.isRequired,
  tier: PropTypes.object.isRequired,
  reloadInfo: PropTypes.func
};

export default withStyles(styles)(Pricing);
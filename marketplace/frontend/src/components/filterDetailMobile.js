import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  inline: {
    display: 'inline-block',
  },
}));

/**
 * Simple component with no state.
 * @param {object} props should have function that set the filter
 * @return {object} JSX
 */
function OneFilter(props) {
  const [expanded, setExpanded] = React.useState(false);
  // const [min, setMin] = React.useState(0); // should not really go here
  // const [max, setMax] = React.useState(0); // should not really go here
  const classes = useStyles();
  /**
  * @param {string} value
  */
  function assignMin(value) {
    let ele;
    for (let i = 0; i < props.filterArray.length; i++) { // check if already in
      if (props.filterArray[i].name == props.name) { // found
        ele = props.filterArray[i];
      }
    }
    if (!ele) { // does not exist
      ele = {'name': props.name, 'min': 0, 'max': 0}; // create a new one
      props.filterArray.push(ele);
    }
    ele.min = value;
  }
  /**
  * @param {string} value
  */
  function assignMax(value) {
    let ele;
    for (let i = 0; i < props.filterArray.length; i++) { // check if already in
      if (props.filterArray[i].name == props.name) { // found
        ele = props.filterArray[i];
      }
    }
    if (!ele) { // does not exist
      ele = {'name': props.name, 'min': 0, 'max': 0}; // create a new one
      props.filterArray.push(ele);
    }
    ele.max = value;
  }

  const handleChange = () => (event, isExpanded) => {
    if (expanded) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };
  // conditional rendering goes here. three cases
  // 1 range, 2 selections, 3 location
  return (
    <div className = {classes.root}>
      <Accordion expanded={expanded} onChange={handleChange()}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="filter"
          id="a filter">
          <Typography className={classes.heading}>{props.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className = {classes.inline}>
            <TextField id="min input"
              onChange={(event) => assignMin(event.target.value)}
              label="min" variant="outlined" className = {classes.inline}/>
            <TextField id="max input"
              onChange={(event) => assignMax(event.target.value)}
              label="max" variant="outlined" className = {classes.inline}/>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default OneFilter;

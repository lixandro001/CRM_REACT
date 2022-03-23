import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { YouTube as YouTubeIcon } from 'src/assets/icons';
import { Facebook as FacebookIcon } from 'src/assets/icons';
import { Twiter as TwiterIcon } from 'src/assets/icons';
import { Linkedin as LinkedinIcon } from 'src/assets/icons';
import { Grid, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    placeContent: 'center'
  },
  redSocialItem: {
    margin: theme.spacing(0.5),
    maxWidth: '40px',
    maxHeight: '40px'
  }
}));

const SocialButtons = () => {
  const classes = useStyles();
  const ListRedesSociales = [
    {
      id: 'IconFacebook',
      path: 'https://www.facebook.com/suizalab',
      image: <FacebookIcon fontSize="large" />,
      descripcion: 'Facebook'
    },
    {
      id: 'IconLinkedin',
      path: 'https://www.linkedin.com/in/suiza-lab-89761971',
      image: <LinkedinIcon fontSize="large" />,
      descripcion: 'Linkedin'
    },
    {
      id: 'IconTwitter',
      path: 'https://twitter.com/SuizaLab',
      image: <TwiterIcon fontSize="large" />,
      descripcion: 'Twitter'
    },

    {
      id: 'IconYoutube',
      path: 'https://www.youtube.com/user/suizalabmarketing?feature=c4-feed-u',
      image: <YouTubeIcon fontSize="large" />,
      descripcion: 'Youtube'
    }
  ];
  return (
    <Grid
      container
      spacing={1}
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      {ListRedesSociales &&
        ListRedesSociales.map((rs, index) => (
          <a
            key={index}
            href={rs.path}
            target="_blank"
            title={'Ir a ' + rs.descripcion}
            rel="noopener noreferrer"
          >
            <IconButton
              className={classes.redSocialItem}
              color="primary"
              aria-label="add"
            >
              {rs.image}
            </IconButton>
          </a>
        ))}
    </Grid>
  );
};

export default SocialButtons;

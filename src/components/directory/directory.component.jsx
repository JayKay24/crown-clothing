import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectDirectorySections } from "../../redux/directory/directory.selectors";

import MenuItem from "../menu-item/menu-item.component";

import "./directory.component.scss";

const Directory = ({ sections, otherMenuItemProps }) => {
  return (
    <div className="directory-menu">
      {sections.map(({ id, ...otherMenuItemProps }) => (
        <MenuItem key={id} {...otherMenuItemProps} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);

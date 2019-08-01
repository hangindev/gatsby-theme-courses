import React from "react"
import ResponsiveEmbed from "react-responsive-embed"

export default ({ id, ...props}) => <ResponsiveEmbed allowFullScreen ratio='16:9' src={`https://www.youtube.com/embed/${id}`} {...props} />
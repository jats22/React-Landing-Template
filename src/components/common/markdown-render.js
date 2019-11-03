import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import MathJax from 'react-mathjax';
import RemarkMathPlugin from 'remark-math';
import marked from 'marked';

function MarkdownRender(props) {
    console.log(props)
    const newProps = {
        ...props,
        plugins: [
          RemarkMathPlugin,
        ],
        renderers: {
          ...props.renderers,
          math: (props) => 
            <MathJax.Node formula={props.value} />,
          inlineMath: (props) =>
            <MathJax.Node inline formula={props.value}  />
        }
      };
      return (
        <MathJax.Provider input="tex" options={{ messageStyle:"none",showProcessingMessages:false, errorSettings:{ style:{'display':'none'}}} } >
            <ReactMarkdown {...newProps}  escapeHtml={false} />
        </MathJax.Provider>
      );
}

export default MarkdownRender
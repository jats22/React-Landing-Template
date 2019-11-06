import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import MathJax from 'react-mathjax';
import RemarkMathPlugin from 'remark-math';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

function MarkdownRender(props) {
  // console.log(props)
  const newProps = {
    ...props,
    plugins: [
      RemarkMathPlugin,
    ],
    renderers: {
      ...props.renderers,
      math: (props) =>
        <BlockMath >{props.value}</BlockMath>,
      inlineMath: (props) =>
        <InlineMath>{props.value}</InlineMath>,
    }
  };
  return (
    <MathJax.Provider input="tex" options={{ messageStyle: "none", showProcessingMessages: false, errorSettings: { style: { 'display': 'none' } } }} >
      <ReactMarkdown {...newProps} escapeHtml={false} />
    </MathJax.Provider>
  );
}

export default MarkdownRender
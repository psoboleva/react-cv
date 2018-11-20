import * as React from 'react';
import { ITextData } from '../../types/TextDataTypes';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

interface ITextDisplay {
    data: ITextData;
}

export class TextDataDisplay extends React.Component<ITextDisplay, any>
{

    render() {
        return (
            <div>
                {this.props.data &&
                    <div>
                        {this.props.data.image && <img src={this.props.data.image} />}
                        {this.props.data.header && <header>{ReactHtmlParser(this.props.data.header)}</header>}
                        {this.props.data.content.map(function (content: string, index: number) {
                            return (
                                <p key={index}>{ReactHtmlParser(content)}</p>
                            );
                        })}
                        {this.props.data.footer && <footer>{ReactHtmlParser(this.props.data.footer)}</footer>}
                    </div>
                }

            </div>
        );
    }
}
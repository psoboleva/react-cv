import * as React from 'react';
import { IMessageDisplay } from '../../types/StoreTypes';

export class Preloader extends React.Component<any, IMessageDisplay>
{

    render() {
        return (
            <div className='preloader'>
                {this.props.message ?
                    <div className='message'>{this.props.message}</div>
                    :
                    <div className='message'>Loading...</div>
                }
            </div>
        );
    }
}

export class Error extends React.Component<any, IMessageDisplay>
{

    render() {
        return (
            <div className='error-container'>
                {this.props.message ?
                    <div className='message'>{this.props.message}</div>
                    :
                    <div className='message'>Something is wrong</div>
                }
            </div>
        );
    }
}

export class Warning extends React.Component<any, IMessageDisplay>
{

    render() {
        return (
            <div className='warning-container'>
                {this.props.message ?
                    <div className='message'>{this.props.message}</div>
                    :
                    <div className='message'>Something is wrong</div>
                }
            </div>
        );
    }
}
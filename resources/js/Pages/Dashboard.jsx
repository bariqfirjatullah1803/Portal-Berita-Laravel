import React, { useState, useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import { Link, Head, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default function Dashboard(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const {flash} = usePage().props;

    const handleSubmit = () => {
        const data = {
            title, description, category
        }
        Inertia.post('/news', data)
        setTitle('')
        setDescription('')
        setCategory('')

    }


    useEffect(() => {
        if (!props.myNews) {

            Inertia.get('/news')
        }
        return;
    }, [])

    return (
        <div>
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white border-b border-white-300 shadow-sm sm:rounded-lg">
                        {flash.message &&
                            <div className="alert alert-success shadow-lg">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{flash.message}</span>
                                </div>
                            </div>
                        }
                        <input type="text" placeholder="Title" className="input input-bordered w-full m-2 bg-white" onChange={(title) => setTitle(title.target.value)} value={title} />
                        <input type="text" placeholder="Description" className="input input-bordered w-full m-2 bg-white" onChange={(description) => setDescription(description.target.value)} value={description} />
                        <input type="text" placeholder="Category" className="input input-bordered w-full m-2 bg-white" onChange={(category) => setCategory(category.target.value)} value={category} />
                        <button className="m-2 btn btn-primary" onClick={() => handleSubmit()}>Submit</button>
                    </div>
                </div>
                <div className="px-16 px-5 mx-auto max-w-7xl">
                    {props.myNews &&
                        props.myNews.length > 0 ? props.myNews.map((news, i) => {
                            return (
                                <div key={i} className="card w-full bg-white shadow-xl text-slate-600 py-10 py-8 m-2 ">
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {news.title}
                                            {flash.message && props.maxId == news.id ?
                                                <div className="badge badge-secondary">NEW</div> : <div></div>
                                            }
                                        </h2>
                                        <p>{news.description}</p>
                                        <div className="card-actions justify-end">
                                            <div className="badge badge-inline">{news.category}</div>
                                            <div className="badge badge-outline">
                                                <Link href={route('edit.news')} as='button' method='get' data={{ id:news.id }}>
                                                edit
                                                </Link>
                                                </div>
                                            <div className="badge badge-outline">delete </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) :
                        <p className="card w-full lg:w-2/5 bg-white shadow-xl text-slate-600 py-10">Anda belum memiliki berita</p>
                    }
                </div>
            </div>
        </div>
    );
}

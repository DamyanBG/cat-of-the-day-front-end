const Rules = () => {
    return (
        <div>
            <form className="form-horizontal" action="">
               <div className="form-body">
                   <div className="row">
                       
                           <div className="form-group">
                               <label className="control-label col-md-3 text-danger opacity-52" htmlFor="">Cat name</label>
                               <div className="col-md-4"><input className="form-control" type="text" /></div>
                           </div>
                       </div>
                       <div className="form-group">
                           <label className="" htmlFor="">Owner name</label>
                           <input className="form-control" type="text" />
                       
                   </div>
               </div>
                
                <button className="btn btn-primary mt-2 fade-in-down" >Save</button>
            </form>
        </div>
    )
}

export default Rules;
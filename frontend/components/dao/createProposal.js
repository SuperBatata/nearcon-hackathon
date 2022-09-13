import React from 'react'

//Loading components
import Loader2 from '../shared/Loading/loader2'

//Primreact
import { classNames } from 'primereact/utils'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog';


const CreateProposal = ({ formik, onHide, loader }) => {
  return (
    <div className="container mt-4">
      {!loader ? (
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <span className="p-float-label grid-item">
                <InputText
                  id="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  tooltip="Enter your username"
                  tooltipOptions={{
                    position: 'bottom',
                    mouseTrack: true,
                    mouseTrackTop: 15,
                  }}
                  className={classNames({
                    'p-invalid': formik.touched.title && formik.errors.title,
                  })}
                />

                <label
                  htmlFor="title"
                  className={classNames({
                    'p-error': formik.touched.title && formik.errors.title,
                  })}
                >
                  {formik.touched.title && formik.errors.title
                    ? formik.errors.title
                    : 'Title'}
                </label>
              </span>
            </div>
            <div className="col-md-6">
              <span className="p-float-label grid-item">
                <InputText
                  id="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={classNames({
                    'p-invalid':
                      formik.touched.description && formik.errors.description,
                  })}
                />
                <label
                  htmlFor="description"
                  className={classNames({
                    'p-error':
                      formik.touched.description && formik.errors.description,
                  })}
                >
                  {formik.touched.description && formik.errors.description
                    ? formik.errors.description
                    : 'Description'}
                </label>
              </span>
            </div>
            <div className="col-md-6 mt-4" style={{ paddingTop: '10px' }}>
              <span className="p-float-label grid-item">
                <InputText
                  id="duration_days"
                  value={formik.values.duration_days}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={classNames({
                    'p-invalid':
                      formik.touched.duration_days &&
                      formik.errors.duration_days,
                  })}
                />

                <label
                  htmlFor="duration_days"
                  className={classNames({
                    'p-error':
                      formik.touched.duration_days &&
                      formik.errors.duration_days,
                  })}
                >
                  {formik.touched.duration_days && formik.errors.duration_days
                    ? formik.errors.duration_days
                    : 'Days'}
                </label>
              </span>
            </div>
            <div className="col-md-6 mt-4" style={{ paddingTop: '10px' }}>
              <span className="p-float-label grid-item">
                <InputText
                  id="duration_hours"
                  value={formik.values.duration_hours}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={classNames({
                    'p-invalid':
                      formik.touched.duration_hours &&
                      formik.errors.duration_hours,
                  })}
                />

                <label
                  htmlFor="duration_hours"
                  className={classNames({
                    'p-error':
                      formik.touched.duration_hours &&
                      formik.errors.duration_hours,
                  })}
                >
                  {formik.touched.duration_hours && formik.errors.duration_hours
                    ? formik.errors.duration_hours
                    : 'Hours'}
                </label>
              </span>
            </div>
            <div className="col-md-6 mt-4" style={{ paddingTop: '10px' }}>
              <span className="p-float-label grid-item">
                <InputText
                  id="duration_min"
                  value={formik.values.duration_min}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={classNames({
                    'p-invalid':
                      formik.touched.duration_min && formik.errors.duration_min,
                  })}
                />

                <label
                  htmlFor="duration_min"
                  className={classNames({
                    'p-error':
                      formik.touched.duration_min && formik.errors.duration_min,
                  })}
                >
                  {formik.touched.duration_min && formik.errors.duration_min
                    ? formik.errors.duration_min
                    : 'Minutes'}
                </label>
              </span>
            </div>
          </div>
          <div
            className="mt-4"
            style={{ display: 'flex', justifyContent: 'right' }}
          >
            <Button
              label="No"
              icon="pi pi-times"
              onClick={() => onHide('displayBasic2')}
              className="p-button-text"
            />
            <Button label="Yes" icon="pi pi-check" type="submit" autoFocus />
          </div>
        </form>
      ) : (
        <div className="text-center">
          <Loader2 />
        </div>
      )}
    </div>
  )
}

export default CreateProposal

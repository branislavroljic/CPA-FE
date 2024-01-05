import * as React from 'react';
import { useController, Control } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Box, IconButton, Typography } from '@mui/material';
import { DeleteForever, PhotoCamera } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { InputHTMLAttributes } from 'react';

interface ImageFilePickerProps {
  control: Control<any>;
  name: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  maxFiles?: number;
}

const ImageFilePicker: React.FC<ImageFilePickerProps> = ({
  control,
  name,
  disabled = false,
  error,
  helperText,
  maxFiles = 1,
}) => {
  const {
    field: { ref, onChange, value },
    fieldState: { invalid },
  } = useController({
    name,
    control,
  });

  const { t } = useTranslation();
  const isMultiple = maxFiles > 1;

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    disabled,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['jpg'],
      'image/jpeg': ['jpeg'],
    },
    onDrop: (acceptedFiles) => {
      onChange(isMultiple ? acceptedFiles : acceptedFiles[0]);
    },
    maxFiles: maxFiles,
    noClick: true,
    noKeyboard: true,
    multiple: maxFiles > 1,
  });

  const handleRemove = () => {
    onChange(null);
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={1}>
        {/* <Typography variant="body1">{label}</Typography> */}
        {value && (
          <IconButton size="small" onClick={handleRemove}>
            <DeleteForever />
          </IconButton>
        )}
      </Box>
      <Box
        sx={{
          borderRadius: 1,
          border: '1px dashed',
          borderColor: 'text.disabled',
          p: 1,
          textAlign: 'center',
          ...(isDragActive && {
            borderColor: 'primary.main',
            backgroundColor: 'action.hover',
          }),
          ...(invalid && {
            borderColor: 'error.main',
          }),
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} ref={ref} />
        {value ? (
          isMultiple ? (
            <div>
              {value.map((item: any, index: any) => (
                <Typography key={index} variant="body2">
                  {item.name}
                </Typography>
              ))}
            </div>
          ) : (
            <Typography variant="body2">{value.name}</Typography>
          )
        ) : (
          <Typography variant="body2" color="text.secondary">
            {'Dodaj fotografiju'}
          </Typography>
        )}
        <IconButton color="primary" onClick={open} component="label">
          {/* <input hidden accept="image/*" type="file" /> */}
          <PhotoCamera />
        </IconButton>
      </Box>
      {helperText && (
        <Typography variant="body2" color={error ? 'error' : 'text.secondary'}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default ImageFilePicker;

// interface ImageFilePickerProps extends InputHTMLAttributes<HTMLInputElement> {
//   // accept: string;
//   disabled?: boolean;
//   error?: boolean;
//   helperText?: string;
// }

// const ImageFilePicker = React.forwardRef<
//   HTMLInputElement,
//   ImageFilePickerProps
// >(
//   (
//     {
//       // name = '',
//       disabled = false,
//       onChange,
//       value,
//       error,
//       helperText,
//       ...rest
//     },
//     ref
//   ) => {
//     // const {
//     //   field: { onChange, value },
//     //   fieldState: { invalid },
//     // } = useController({
//     //   name,
//     // });
//     const { t } = useTranslation();

//     const { getRootProps, getInputProps, isDragActive } = useDropzone({
//       disabled,
//       accept: {
//         'image/png': ['.png'],
//         'image/jpg': ['jpg'],
//         'image/jpeg': ['jpeg'],
//       },
//       onDrop: (acceptedFiles) => {
//         onChange ? onChange(acceptedFiles[0]) : undefined;
//       },
//     });

//     // const handleRemove = () => {
//     //   onChange(null);
//     // };

//     return (
//       <Box>
//         {/* <Box display="flex" alignItems="center" mb={1}> */}
//         {/* <Typography variant="body1">{label}</Typography> */}
//         {/* {value && (
//           <IconButton size="small" onClick={handleRemove}>
//             <DeleteForever />
//           </IconButton>
//         )} */}
//         {/* </Box> */}
//         <Box
//           sx={{
//             borderRadius: 1,
//             border: '1px dashed',
//             borderColor: 'text.disabled',
//             p: 1,
//             textAlign: 'center',
//             ...(isDragActive && {
//               borderColor: 'primary.main',
//               backgroundColor: 'action.hover',
//             }),
//             ...(error && {
//               borderColor: 'error.main',
//             }),
//           }}
//           {...getRootProps()}
//         >
//           <input {...getInputProps()} ref={ref} />
//           {value ? (
//             <Typography variant="body2">{'nesto'}</Typography>
//           ) : (
//             <Typography variant="body2" color="text.secondary">
//               {t('specialOffer.addImageInstructions')}
//             </Typography>
//           )}
//         </Box>
//         {helperText && (
//           <Typography
//             variant="body2"
//             color={error ? 'error' : 'text.secondary'}
//           >
//             {helperText}
//           </Typography>
//         )}
//       </Box>
//     );
//   }
// );

// ImageFilePicker.displayName = 'ImageFilePicker';

// export default ImageFilePicker;

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const RegisterForm = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Controller
        control={control}
        name='username'
        rules={{
          required: "Tên đăng nhập là bắt buộc",
        }}
        render={({ field }) => (
          <TextField
            placeholder='Tên đăng nhập'
            type='text'
            {...field}
            error={errors.username?.type === "required" && true}
            helperText={errors.username?.message}
          />
        )}
      />

      <Controller
        control={control}
        name='password'
        rules={{
          required: "Mật khẩu là bắt buộc",
        }}
        render={({ field }) => (
          <TextField
            placeholder='Nhập mật khẩu'
            type={showPassword ? "text" : "password"}
            {...field}
            error={errors.password && true}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Controller
        control={control}
        name='confirmPassword'
        rules={{
          required: "Nhập lại mật khẩu là bắt buộc",
          validate: {
            isExact: (value) =>
              value === watch("password") ||
              "Mật khẩu nhập lại chưa trùng khớp",
          },
        }}
        render={({ field }) => (
          <TextField
            placeholder='Nhập lại mật khẩu'
            type={showPassword ? "text" : "password"}
            {...field}
            error={errors.confirmPassword && true}
            helperText={errors.confirmPassword?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Controller
        control={control}
        name='email'
        rules={{
          required: "Email là bắt buộc",
        }}
        render={({ field }) => (
          <TextField
            placeholder='Email'
            type='email'
            {...field}
            error={errors.email?.type === "required" && true}
            helperText={errors.email?.message}
          />
        )}
      />
      <Button
        variant='contained'
        size='large'
        color='secondary'
        type='submit'
        sx={{
          textTransform: "capitalize",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Đăng ký
      </Button>
    </>
  );
};

export default RegisterForm;

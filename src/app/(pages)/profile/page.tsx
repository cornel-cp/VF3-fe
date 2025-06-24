"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  User,
  Edit3,
  Save,
  X,
  Upload,
  Copy,
  CheckCircle,
  AlertCircle,
  Camera,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { User as UserType } from "@/types";
import { ApiService } from "@/lib/ApiService";
import { CDNService } from "@/lib/CDNService";
import { useConnectWalletModal } from "@/hooks/useConnectWalletModal";
import { formatWalletAddress, formatBalance } from "@/utils/format";
import { useUser } from "@/hooks/useUser";
import { useWallet } from "@solana/wallet-adapter-react";

const initialUser: UserType = {
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  name: "John Doe",
  walletAddress: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgHXv",
  balance: 0,
};

const UserProfilePage = () => {
  const { user: contextUser, error, isLoading: isUserLoading } = useUser();
  const { connected } = useWallet();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserType | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<UserType>>({});
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { openWalletModal } = useConnectWalletModal();

  useEffect(() => {
    if (contextUser) {
      setEditForm(contextUser);
    }
  }, [contextUser]);

  console.log(contextUser);
  // Not connected state - show this first
  if (!connected) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-gradient-to-r from-primary/5 to-highlight/5 border-primary/20">
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-surface-elevated rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-primary">
                Connect Your Wallet
              </h2>
              <p className="text-text-secondary">
                Please connect your wallet to access your profile.
              </p>
            </div>
            <Button
              variant="primary"
              className="mt-4"
              onClick={() => openWalletModal()}
            >
              Connect Wallet
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Loading state
  if (isUserLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-gradient-to-r from-primary/5 to-highlight/5 border-primary/20">
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-surface-elevated rounded-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-primary">Loading Profile</h2>
              <p className="text-text-secondary">Please wait while we fetch your profile data.</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-gradient-to-r from-red-500/5 to-red-600/5 border-red-500/20">
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-surface-elevated rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-red-500">Error Loading Profile</h2>
              <p className="text-text-secondary">{error.message || "Failed to load profile data. Please try again later."}</p>
            </div>
            <Button
              variant="primary"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // No user data state
  if (!contextUser) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-gradient-to-r from-primary/5 to-highlight/5 border-primary/20">
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-surface-elevated rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-primary">
                No Profile Found
              </h2>
              <p className="text-text-secondary">
                We couldn't find your profile data. Please try refreshing the page.
              </p>
            </div>
            <Button
              variant="primary"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const validateForm = (): boolean => {
    if (!editForm) return false;
    const newErrors: Partial<UserType> = {};

    if (!editForm.name.trim()) {
      newErrors.name = "Name is required";
    } else if (editForm.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (editForm.name.length > 50) {
      newErrors.name = "Name must be less than 50 characters";
    }

    if (!editForm.avatar.trim()) {
      newErrors.avatar = "Avatar URL is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = () => {
    setEditForm(contextUser);
    setErrors({});
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditForm(contextUser);
    setErrors({});
    setIsEditing(false);
  };

  const uploadToCDN = async (file: File) => {
    const response = await CDNService.getInstance().uploadImage(file);
    return response;
  };

  const handleSave = async () => {
    if (!editForm || !validateForm()) return;

    setIsSaving(true);
    try {
      const avatar = await uploadToCDN(
        new File([editForm.avatar], "avatar.png", { type: "image/png" })
      );
      await ApiService.getInstance().updateUser({
        avatar: avatar,
        name: editForm.name,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      setErrors(prev => ({
        ...prev,
        submit: "Failed to update profile. Please try again."
      }));
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof UserType, value: string | number) => {
    if (!editForm) return;
    
    setEditForm((prev) => ({
      ...prev!,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleInputChange("avatar", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const copyWalletAddress = async () => {
    try {
      await navigator.clipboard.writeText(contextUser.walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy wallet address:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-primary">Profile</h1>
        <p className="text-text-secondary">
          Manage your account information and preferences
        </p>
      </div>

      {/* Profile Card */}
      <Card className="overflow-hidden bg-gradient-to-br from-surface-primary to-surface-secondary border-primary/10">
        {/* Cover Section */}
        <div className="h-32 bg-gradient-to-r from-primary/20 to-highlight/20 relative">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              {/* Avatar */}
              <div className="w-32 h-32 rounded-full border-4 border-surface-primary shadow-glow overflow-hidden">
                <img
                  src={isEditing && editForm ? editForm.avatar : contextUser.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      contextUser.name
                    )}&size=128&background=6366f1&color=ffffff`;
                  }}
                />
              </div>

              {/* Camera icon for editing */}
              {isEditing && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 w-8 h-8 bg-primary text-background rounded-full flex items-center justify-center hover:bg-highlight transition-colors shadow-glow"
                  title="Change avatar"
                >
                  <Camera className="w-4 h-4" />
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 px-8 pb-8">
          <div className="text-center mb-8">
            {/* Edit/Save/Cancel Buttons */}
            <div className="flex justify-center space-x-3 mb-6">
              {!isEditing ? (
                <Button
                  onClick={handleEdit}
                  variant="primary"
                  className="flex items-center space-x-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    variant="primary"
                    className="flex items-center space-x-2"
                  >
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>{isSaving ? "Saving..." : "Save"}</span>
                  </Button>
                  <Button
                    onClick={handleCancel}
                    disabled={isSaving}
                    variant="ghost"
                    className="flex items-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Display Name
              </label>
              {isEditing && editForm ? (
                <div>
                  <Input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={errors.name ? "border-red-500" : ""}
                    placeholder="Enter your display name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-text-tertiary" />
                  <span className="text-lg font-medium text-text-primary">
                    {contextUser.name}
                  </span>
                </div>
              )}
            </div>

            {/* Wallet Address Field */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Wallet Address
              </label>
              <div className="flex items-center space-x-3 p-3 bg-surface-elevated rounded-lg border border-surface-tertiary/30">
                <code className="flex-1 text-sm font-mono text-text-primary">
                  {formatWalletAddress(contextUser.walletAddress)}
                </code>
                <button
                  onClick={copyWalletAddress}
                  className="flex items-center space-x-1 text-highlight hover:text-primary transition-colors"
                  title="Copy full address"
                >
                  {copied ? (
                    <CheckCircle className="w-4 h-4 text-primary" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span className="text-sm">{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              <p className="mt-1 text-sm text-text-tertiary">
                Your wallet address cannot be changed
              </p>
            </div>

            {/* Balance Field */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Balance (SOL)
              </label>
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-primary/5 to-highlight/5 rounded-lg border border-primary/20">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-background font-bold text-sm">◎</span>
                </div>
                <span className="text-xl font-bold text-text-primary">
                  {formatBalance(contextUser.balance)} SOL
                </span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-surface-tertiary/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-text-secondary">
              <div>
                <span className="font-medium">Account Created:</span>
                <span className="ml-2">March 15, 2024</span>
              </div>
              <div>
                <span className="font-medium">Last Updated:</span>
                <span className="ml-2">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tips */}
      <Card className="bg-gradient-to-r from-primary/5 to-highlight/5 border-primary/20">
        <div className="p-4">
          <h3 className="font-semibold text-primary mb-2">💡 Profile Tips</h3>
          <ul className="text-sm text-text-secondary space-y-1">
            <li>• Use a clear, professional photo for your avatar</li>
            <li>• Keep your display name recognizable to other users</li>
            <li>• Your wallet address is unique and cannot be changed</li>
            <li>• Balance updates automatically when you make transactions</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default UserProfilePage;
